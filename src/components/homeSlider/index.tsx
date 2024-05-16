import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

type ImgUrlArray = {
  url: string;
}[];

const HomeSlider = ({ imgs }: { imgs: ImgUrlArray }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const prevSlider = () =>
    setSliderIndex((prev) => {
      const prevIndex = sliderIndex === 0 ? imgs.length - 1 : --prev;
      return prevIndex;
    });

  const nextSlider = () =>
    setSliderIndex((prev) => {
      const nextIndex = sliderIndex === imgs.length - 1 ? 0 : ++prev;
      return nextIndex;
    });

  useEffect(() => {
    const temporizador = setInterval(() => {
      setSliderIndex((prevIndex) => {
        const nextIndex = prevIndex === imgs.length - 1 ? 0 : ++prevIndex;
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(temporizador);
  }, []);
  return (
    <>
      <div className="relative my-4 rounded-2xl w-full flex flex-col gap-5 m-auto  group overflow-hidden">
        <div
          className="rounded-2xl flex transition-transform duration-300 shadow-2xl ease-out"
          style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
        >
          {imgs.map(({ url }, i) => (
            <img
              key={i}
              className="object-cover"
              src={url}
              alt="Image do banner frotas"
            />
          ))}
        </div>

        <div className="md:hidden flex absolute z-10 w-full h-full inset-0 md:group-hover:flex justify-between items-center p-2">
          <button
            className="bg-black/60 rounded-full h-fit p-2 text-white"
            onClick={prevSlider}
          >
            <MdOutlineArrowBackIos size={25} />
          </button>
          <button
            className="bg-black/60 rounded-full h-fit p-2 text-white"
            onClick={nextSlider}
          >
            <MdOutlineArrowForwardIos size={25} />
          </button>
        </div>
        <div className="flex gap-2 absolute inset-0 mb-3 justify-center items-end">
          {imgs.map((_, i) => (
            <GoDotFill
              size={20}
              className={` ${
                sliderIndex === i ? "text-black/70 scale-150" : "text-white"
              } duration-300 ease-linear`}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
