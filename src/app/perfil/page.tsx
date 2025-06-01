"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  Badge,
  Calendar,
  Camera,
  Check,
  Eye,
  Link,
  Linkedin,
  MapPin,
  Menu,
  Pencil,
  Star,
  Twitter,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Branded type for UserId
type UserId = string & { __brand: "UserId" };

// Interface for Clerk's unsafeMetadata
interface UnsafeMetadata {
  bio?: string;
  coverImage?: string | null;
}

// Interface for user profile data
interface ProfileState {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  username: string;
  imageUrl: string;
  createdAt: number; // Keep as number for consistency
  coverImage: string | null;
  userId: UserId;
}

// Interface for social links
interface SocialLink {
  name: string;
  icon: React.ReactNode;
  color: string;
}

// Constants
const SOCIAL_LINKS = [
  { name: "Twitter", icon: <Twitter size={20} />, color: "text-blue-400" },
  { name: "LinkedIn", icon: <Linkedin size={20} />, color: "text-blue-700" },
  { name: "Instagram", icon: <Camera size={20} />, color: "text-pink-500" },
] as const;

const TABS = ["Posts", "Followers", "Following", "Media"] as const;

// Type for tabs
type Tab = (typeof TABS)[number];

// Default profile state
const DEFAULT_PROFILE: ProfileState = {
  firstName: "",
  lastName: "",
  bio: "",
  email: "",
  username: "",
  imageUrl: "",
  createdAt: 0,
  coverImage: null,
  userId: "" as UserId,
};

// Sub-component: Profile Header
interface ProfileHeaderProps {
  profile: ProfileState;
  edit: boolean;
  setEdit: (value: boolean) => void;
  coverImageInputRef: React.RefObject<HTMLInputElement>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  edit,
  setEdit,
  coverImageInputRef,
}) => (
  <div className="relative h-64 sm:h-80 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    {profile.coverImage ? (
      <Image
        src={profile.coverImage}
        alt="Cover"
        className="w-full h-full object-cover transition-opacity hover:opacity-90"
      />
    ) : (
      <div className="w-full h-full" />
    )}
    {edit && (
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        onClick={() => coverImageInputRef.current?.click()}
        aria-label="Change cover image">
        <Upload size={18} className="mr-2" />
        Change Cover
      </Button>
    )}
    <input
      type="file"
      accept="image/*"
      ref={coverImageInputRef}
      className="hidden"
      aria-hidden="true"
    />
  </div>
);

// Sub-component: Profile Info
interface ProfileInfoProps {
  profile: ProfileState;
  edit: boolean;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  setEdit: (value: boolean) => void;
  subscriptionPlan: string | null;
  router: ReturnType<typeof useRouter>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  edit,
  setProfile,
  setEdit,
  subscriptionPlan,
  router,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pick<ProfileState, "firstName" | "lastName" | "bio">
  ) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className="relative -mt-20 sm:-mt-24">
        <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-white shadow-lg">
          <AvatarImage src={profile.imageUrl} />
          <AvatarFallback className="text-2xl bg-gray-200">
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {subscriptionPlan && (
          <span
            className="absolute bottom-0 right-0 text-white text-xs rounded-full p-1.5 animate-colorPulse"
            aria-label="Usuario verificado">
            <Badge />
          </span>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          {!edit ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setEdit(true)}
                aria-label="Edit profile">
                <Pencil size={18} />
              </Button>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Input
                placeholder="First Name"
                value={profile.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                className="w-full sm:w-40"
                maxLength={50}
                aria-label="First name"
              />
              <Input
                placeholder="Last Name"
                value={profile.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                className="w-full sm:w-40"
                maxLength={50}
                aria-label="Last name"
              />
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setEdit(false)}
                aria-label="Save profile">
                <Check size={18} />
              </Button>
            </div>
          )}
          <Button
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/subscription")}
            title={subscriptionPlan ? "Change Plan" : "Subscribe"}
            aria-label={
              subscriptionPlan
                ? "Change subscription plan"
                : "Subscribe to premium"
            }>
            <Star size={20} />
          </Button>
        </div>

        <span className="text-muted-foreground text-lg">
          @{profile.username}
        </span>
        <p className="mt-2 text-gray-600 max-w-md">
          {edit ? (
            <Input
              placeholder="Add a bio"
              value={profile.bio}
              onChange={(e) => handleInputChange(e, "bio")}
              className="w-full"
              maxLength={160}
              aria-label="Bio"
            />
          ) : (
            profile.bio || "No bio yet."
          )}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>Location: New York</span>
          </div>
          <div className="flex items-center gap-1">
            <Link size={16} />
            <span>example.com</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>
              Joined: {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {SOCIAL_LINKS.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              size="icon"
              title={link.name}
              className={link.color}
              aria-label={`Visit ${link.name} profile`}>
              {link.icon}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-component: Featured Section
const FeaturedSection: React.FC = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Featured</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="p-4 bg-gray-50 hover:bg-gray-100 transition"
          role="article">
          <div className="h-32 bg-gray-200 rounded-md" />
          <p className="mt-2 text-sm text-gray-600">Pinned Post #{i}</p>
        </Card>
      ))}
    </div>
  </div>
);

// Main Component
const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const [profile, setProfile] = useState<ProfileState>(DEFAULT_PROFILE);
  const [edit, setEdit] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  // Sync user data
  useEffect(() => {
    if (isLoaded && user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: (user.unsafeMetadata as UnsafeMetadata)?.bio || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        username: user.username || "",
        imageUrl: user.imageUrl || "",
        createdAt: user.createdAt
          ? new Date(user.createdAt).getTime()
          : Date.now(), // Convert to timestamp
        coverImage: (user.unsafeMetadata as UnsafeMetadata)?.coverImage || null,
        userId: user.id as UserId,
      });
      setSubscriptionPlan("Premium"); // Placeholder
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6" role="main">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => router.push("/views")}
            aria-label="View insights">
            <Eye size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/settings")}
            aria-label="Open settings">
            <Menu size={22} />
          </Button>
        </div>
      </div>

      {user && (
        <Card
          className="relative overflow-hidden shadow-lg rounded-xl"
          role="region"
          aria-label="Profile card">
          <ProfileHeader
            profile={profile}
            edit={edit}
            setEdit={setEdit}
            coverImageInputRef={coverImageInputRef}
          />
          <div className="p-6 sm:p-8">
            <ProfileInfo
              profile={profile}
              edit={edit}
              setProfile={setProfile}
              setEdit={setEdit}
              subscriptionPlan={subscriptionPlan}
              router={router}
            />
            <div className="mt-6 flex justify-center sm:justify-start gap-6 text-sm font-medium text-gray-700">
              <span>
                <strong>120</strong> Following
              </span>
              <span>
                <strong>85</strong> Followers
              </span>
              <span>
                <strong>45</strong> Posts
              </span>
            </div>
            <div className="mt-6 border-b">
              <div
                className="flex gap-4 sm:gap-6 text-sm font-medium"
                role="tablist">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 ${
                      tab === "Posts"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "hover:border-b-2 hover:border-gray-300"
                    }`}
                    role="tab"
                    aria-selected={tab === "Posts"}
                    aria-label={`View ${tab}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <FeaturedSection />
          </div>
        </Card>
      )}

      <Separator className="my-6" />

      {!isSignedIn && (
        <div
          className="bg-muted p-6 rounded-xl flex flex-col items-center space-y-4 text-center shadow-sm"
          role="region"
          aria-label="Sign-in prompt">
          <p className="text-xl font-semibold">
            Si just one step away from joining us!
          </p>
          <p className="text-gray-600">
            Sign up now to start enjoying all the benefits.
          </p>
          <Button
            className="bg-gray-900 text-white rounded-full px-6"
            onClick={() => router.push("/sign-in")}
            aria-label="Sign in">
            Hola
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
