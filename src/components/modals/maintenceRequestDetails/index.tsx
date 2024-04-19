import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";
import Modal from "../modal";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const MaintenceRequestDetails = ({ show, handleClose, request }: Props) => {
  return (
    <Modal
      isOpen={show}
      modalName="Detalhes da solicitação"
      hidden={handleClose}
      isClickOutHiddeble={true}
    >
      <form>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold capitalize">Dados do solicitante:</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col basis-52 flex-grow">
              <label>Nome</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="text"
                disabled
                value={request.ownerOfReq.name}
              />
            </div>
            <div className="flex flex-col basis-52 flex-grow">
              <label>E-mail</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="email"
                disabled
                value={request.ownerOfReq.email}
              />
            </div>
            <div className="flex flex-col basis-52 flex-grow">
              <label>Telefone</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="tel"
                disabled
                value={request.ownerOfReq.phone}
              />
            </div>
          </div>

          <h3 className="font-semibold capitalize">Dados do veiculo:</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col basis-52 flex-grow">
              <label>Placa</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="text"
                disabled
                value={request.plate}
              />
            </div>
            <div className="flex flex-col basis-52 flex-grow">
              <label>KM</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="number"
                disabled
                value={request.km}
              />
            </div>
            <div className="flex flex-col basis-52 flex-grow">
              <label>Motorista</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="tel"
                disabled
                value={request.driverName}
              />
            </div>
          </div>

          <h3 className="font-semibold capitalize">Dados da entrega:</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col basis-52 flex-grow">
              <label>Encaminhar à oficina até:</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                type="text"
                disabled
                value={
                  request.deadlineToDeviler
                    ? request.deadlineToDeviler?.toLocaleString("pt-BR")
                    : "Ainda não informado!"
                }
              />
            </div>
            <div className="flex flex-col basis-52 flex-grow">
              <label>Data de entrega:</label>
              <input
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full capitalize"
                type="text"
                disabled
                value={
                  request.delivered
                    ? request.deliveredAt?.toLocaleString("pt-BR")
                    : "não realizada!"
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default MaintenceRequestDetails;