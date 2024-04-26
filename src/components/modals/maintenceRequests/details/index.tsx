import { FaCalendarCheck, FaCalendarPlus } from "react-icons/fa";
import { IMaintenceRequest } from "../../../../interfaces/maintanceRequest";
import Modal from "../../modal";
import { useState } from "react";
import SchedulingConfirmationModal from "../actions/scheduling";
import FinishScheduleModal from "../actions/finishSchedule";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const MaintenceRequestDetails = ({ show, handleClose, request }: Props) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isFinishSchedule, setIsFinishScheduling] = useState(false);
  return (
    <>
      <SchedulingConfirmationModal
        request={request}
        show={isScheduling}
        handleClose={() => setIsScheduling((prev) => !prev)}
      />
      <FinishScheduleModal
        show={isFinishSchedule}
        handleClose={() => setIsFinishScheduling((prev) => !prev)}
        request={request}
      />
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
                  value={request.Owner.name}
                />
              </div>
              <div className="flex flex-col basis-52 flex-grow">
                <label>E-mail</label>
                <input
                  className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                  type="email"
                  disabled
                  value={request.Owner.email}
                />
              </div>
              <div className="flex flex-col basis-52 flex-grow">
                <label>Telefone</label>
                <input
                  className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                  type="tel"
                  disabled
                  value={request.Owner.phone}
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

            {request.status === 2 && (
              <>
                <h3 className="font-semibold capitalize">Dados da entrega:</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex flex-col basis-52 flex-grow">
                    <label>Encaminhar à oficina até:</label>
                    <input
                      className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                      type="text"
                      disabled
                      value={
                        request.deadlineToDeliver
                          ? new Date(request.deadlineToDeliver)?.toLocaleString(
                              "pt-BR"
                            )
                          : "Ainda não informado!"
                      }
                    />
                  </div>
                  <div className="flex flex-col basis-52 flex-grow">
                    <label>Status da entrega:</label>
                    <input
                      className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full capitalize"
                      type="text"
                      disabled
                      value={
                        request.deliveredAt
                          ? `Entrega realizada: ${new Date(
                              request.deliveredAt
                            ).toLocaleString("pt-BR")}`
                          : "não realizada!"
                      }
                    />
                  </div>
                </div>
              </>
            )}

            <label>
              <span>Serviço solicitado:</span>
              <textarea
                disabled
                className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full text-justify"
                value={request.service}
                rows={6}
              />
            </label>
          </div>
          <div className="flex w-full justify-end mt-4">
            {request.status === 0 && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-blue-500 hover:bg-blue-600 duration-200"
                onClick={() => {
                  setIsScheduling(true);
                  handleClose();
                }}
              >
                <FaCalendarPlus /> Iniciar agendamento
              </button>
            )}
            {request.status === 1 && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 duration-200"
                onClick={() => {
                  setIsFinishScheduling((prev) => !prev);
                  handleClose();
                }}
              >
                <FaCalendarCheck /> Finalizar agendamento
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MaintenceRequestDetails;
