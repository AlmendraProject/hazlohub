// app/v1/api/posts/route.ts
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Interfaz para tipar la respuesta del GET
interface PostResponse {
  id: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  images: {
    id: string;
    url: string;
    filename: string;
    mimetype: string;
    size: number;
    content: string | null;
    created_at: string;
    updated_at: string;
  }[];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        images: {
          select: {
            id: true,
            url: true,
            filename: true,
            mimetype: true,
            size: true,
            content: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
      orderBy: {
        created_at: "desc", // Corregido de createdAt a created_at
      },
    });

    // Tipar y formatear la respuesta
    const formattedPosts: PostResponse[] = posts.map((post) => ({
      id: post.id,
      nombre: post.nombre,
      titulo: post.titulo,
      descripcion: post.descripcion,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString(),
      images: post.images.map((img) => ({
        id: img.id,
        url: img.url,
        filename: img.filename,
        mimetype: img.mimetype,
        size: img.size,
        content: img.content,
        created_at: img.created_at.toISOString(),
        updated_at: img.updated_at.toISOString(),
      })),
    }));

    const totalPosts = await prisma.post.count();

    return NextResponse.json({
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total: totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error: any) {
    console.error("Error al obtener publicaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener publicaciones" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const content = formData.get("content") as string | null;
    const nombre = formData.get("nombre") as string | null;
    const titulo = formData.get("titulo") as string | null;

    if (!content || !nombre || !titulo) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: content, nombre o titulo" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No se subieron imágenes" },
        { status: 400 }
      );
    }

    const uploadedImages: {
      url: string;
      filename: string;
      mimetype: string;
      size: number;
    }[] = [];

    // Subir imágenes a R2
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      if (!["png", "jpg", "jpeg"].includes(fileExtension)) {
        console.log(
          `Extensión no soportada: ${fileExtension}, usando .jpg como fallback`
        );
        fileExtension = "jpg";
      }

      const filename = `${uuidv4()}.${fileExtension}`;
      const contentType = fileExtension === "png" ? "image/png" : "image/jpeg";

      console.log(
        `Subiendo imagen: ${filename}, Tipo: ${contentType}, Tamaño: ${buffer.length} bytes`
      );

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: filename,
        Body: buffer,
        ContentType: contentType,
      });

      await s3.send(command);

      uploadedImages.push({
        url: `${process.env.R2_PUBLIC_URL}/${filename}`,
        filename,
        mimetype: contentType,
        size: buffer.length,
      });
    }

    // Guardar el post y las imágenes en la base de datos
    const post = await prisma.post.create({
      data: {
        nombre,
        titulo,
        descripcion: content,
        images: {
          create: uploadedImages.map((image) => ({
            url: image.url,
            filename: image.filename,
            mimetype: image.mimetype,
            size: image.size,
            content: null, // Puedes agregar un campo en el formData si quieres asociar texto a la imagen
          })),
        },
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
            filename: true,
            mimetype: true,
            size: true,
            content: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    // Formatear la respuesta para que coincida con el GET
    const formattedPost: PostResponse = {
      id: post.id,
      nombre: post.nombre,
      titulo: post.titulo,
      descripcion: post.descripcion,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString(),
      images: post.images.map((img) => ({
        id: img.id,
        url: img.url,
        filename: img.filename,
        mimetype: img.mimetype,
        size: img.size,
        content: img.content,
        created_at: img.created_at.toISOString(),
        updated_at: img.updated_at.toISOString(),
      })),
    };

    return NextResponse.json({
      message: "Publicación creada con éxito",
      post: formattedPost,
    });
  } catch (error: any) {
    console.error("Error al crear la publicación:", error);
    return NextResponse.json(
      { error: "Error al crear la publicación" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
