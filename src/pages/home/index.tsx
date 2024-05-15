import HomeSlider from "../../components/homeSlider";

const Home = () => {
  const imgs = [
    {
      url: "/3.webp",
    },
    {
      url: "/4.webp",
    },
    {
      url: "/5.webp",
    },
    {
      url: "/6.webp",
    },
    {
      url: "/7.webp",
    },
    {
      url: "/8.webp",
    },
  ];
  return (
    <div className="pt-32 w-full h-screen flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-center">
        Bem vindos ao FrotasCAP, nosso sistema de gestão de manutenções de
        veiculos de frotas!!
      </h3>

      <HomeSlider imgs={imgs} />
    </div>
  );
};

export { Home };
