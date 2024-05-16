import { Link } from "react-router-dom";
import HomeSlider from "../../components/homeSlider";

const Home = () => {
  const imgs = [
    {
      url: "/1.png",
    },
    {
      url: "/2.png",
    },
    {
      url: "/3.png",
    },
  ];
  return (
    <div className="pt-32 pb-16 w-11/12 mx-auto h-screen flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-center">
        Bem vindos ao FrotasCAP, nosso sistema de gestão de manutenções de
        veiculos de frotas!!
      </h3>

      <HomeSlider imgs={imgs} />

      <p className="text-justify md:text-center">
        Para começar a utilizar nosso sistema solicite seu acesso ao time de
        frotas!
      </p>
      <p className="text-justify md:text-center">
        Caso você sejá um usuário já cadastrado em nosso sistema,{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600">
          autentique-se clicando aqui
        </Link>
        , para continuar utilizando.
      </p>
    </div>
  );
};

export { Home };
