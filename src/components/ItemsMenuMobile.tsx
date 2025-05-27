import Link from "next/link";

type MenuItem = {
  id: string;
  label: string;
};

type ItemsMenuMobileProps = {
  menuItems: MenuItem[];
  onClose: () => void;
};

const ItemsMenuMobile = ({ menuItems, onClose }: ItemsMenuMobileProps) => {
  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-black/90 text-white rounded-b-lg shadow-lg z-40">
      <ul className="flex flex-col p-4 gap-4">
        {menuItems.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={id === "/" ? "/" : `/${id}`}
              className="block text-white text-base hover:text-blue-400"
              onClick={onClose}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsMenuMobile;
