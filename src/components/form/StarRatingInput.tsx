import Image from "next/image";
import StarIcon from "./StarIcon";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  value,
  onChange,
}) => {
  const handleClick = (index: number) => {
    const rate = index + 1;
    const returnRate = rate === value ? 0 : rate;
    onChange(returnRate);
  };

  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <StarIcon
        key={index}
        filled={index < value}
        onClick={() => {
          handleClick(index);
          //   console.log("New Rating Value:", index + 1);
        }}
      />
    ));
  return <div className="flex gap-1">{stars}</div>;
};

export default StarRatingInput;
