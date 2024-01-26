import Image from "next/image";

interface StarIconProps {
  filled: boolean;
  onClick: () => void;
}

const StarIcon: React.FC<StarIconProps> = ({ filled, onClick }) => {
  // Icons images
  const starImg = "/images/star.png";
  const fullStarImg = "/images/star-full.png";

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Image
        src={filled ? fullStarImg : starImg}
        alt="Star Icon"
        width={25}
        height={25}
      />
    </div>
  );
};

export default StarIcon;
