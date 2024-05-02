import {
  FaCalendarCheck,
  FaCalendarPlus,
  FaFileArchive,
  FaTools,
} from "react-icons/fa";
import { IMaintenceRequest } from "../../../../interfaces/maintenanceRequest";
import Modal from "../../modal";
import { useState } from "react";
import SchedulingConfirmationModal from "../actions/scheduling";
import FinishScheduleModal from "../actions/finishSchedule";
import { useAuth } from "../../../../store/useAuth";
import { useAuthWs } from "../../../../store/useAuthWs";
import { FaCarOn } from "react-icons/fa6";
import ReciveVehicleModal from "../actions/recieveVehicle";
import SendBudgetModal from "../actions/sendBudget";
import StartMaintenanceModal from "../actions/startMaintenance";
import FinishMaintenanceModal from "../actions/finishMaintenance";
import { useTimeCalc } from "../../../../hooks/useTimeCalc";
import { GiCarKey } from "react-icons/gi";
import DeliverVehicleModal from "../actions/deliverVehicle";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const MaintenceRequestDetails = ({ show, handleClose, request }: Props) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isFinishSchedule, setIsFinishScheduling] = useState(false);
  const [isRecivingVehicle, setIsRecivingVehicle] = useState(false);
  const [isSendingBudget, setIsSendingBudget] = useState(false);
  const [isStartingMaintenance, setIsStartingMaintenance] = useState(false);
  const [isFinishingMaintenance, setIsFinishingMaintenance] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);

  const { user } = useAuth();
  const { workshop } = useAuthWs();

  const { milissegundosParaHorasMinutos } = useTimeCalc();

  return (
    <>
      <SendBudgetModal
        handleClose={() => setIsSendingBudget((prev) => !prev)}
        show={isSendingBudget}
        request={request}
      />
      <StartMaintenanceModal
        handleClose={() => setIsStartingMaintenance((prev) => !prev)}
        show={isStartingMaintenance}
        request={request}
      />
      <SchedulingConfirmationModal
        request={request}
        show={isScheduling}
        handleClose={() => setIsScheduling((prev) => !prev)}
      />
      <ReciveVehicleModal
        show={isRecivingVehicle}
        handleClose={() => setIsRecivingVehicle((prev) => !prev)}
        request={request}
      />
      <FinishScheduleModal
        show={isFinishSchedule}
        handleClose={() => setIsFinishScheduling((prev) => !prev)}
        request={request}
      />
      <FinishMaintenanceModal
        show={isFinishingMaintenance}
        handleClose={() => setIsFinishingMaintenance((prev) => !prev)}
        request={request}
      />
      <DeliverVehicleModal
        request={request}
        show={isDelivering}
        handleClose={() => setIsDelivering((prev) => !prev)}
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

            {request.Workshop && (
              <>
                <h3 className="font-semibold capitalize">Dados da Oficina:</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex flex-col basis-52 flex-grow sm:flex-grow-0">
                    <label>Nome</label>
                    <input
                      className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                      type="text"
                      disabled
                      value={request.Workshop.name}
                    />
                  </div>
                  <div className="flex flex-col basis-52 flex-grow">
                    <label>Endereço</label>
                    <input
                      className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-full"
                      type="text"
                      disabled
                      value={
                        request.Workshop?.Address.street +
                        ", nº: " +
                        request.Workshop?.Address?.number
                      }
                    />
                  </div>
                </div>
              </>
            )}

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

            {request.budgets && request.budgets.length > 0 && (
              <div className="flex gap-3  w-fit my-4 rounded-md">
                {request.budgets.map((req, i) => (
                  <div key={req.id} className="flex flex-col gap-2 ">
                    <p>
                      <span className="font-bold">Orçamento anexado:</span>
                      {new Date(req.createdAt).toLocaleString("pt-BR")}
                    </p>
                    <a
                      href={req.url}
                      download={true}
                      target="_blank"
                      className="bg-blue-600 w-fit p-2 rounded text-white font-semibold"
                    >
                      Baixar Orçamento nº {i + 1}
                    </a>
                  </div>
                ))}
              </div>
            )}

            {request.timeToSchedule && (
              <label className="flex flex-col">
                <span>Tempo de agendamento:</span>
                <input
                  className="bg-sky-200 disabled:bg-sky-100 outline-blue-400 p-2 rounded w-fit text-justify"
                  type="text"
                  disabled
                  value={milissegundosParaHorasMinutos(request.timeToSchedule)}
                />
              </label>
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
            {request.status === 0 && user?.frotas && (
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
            {request.status === 1 && user?.frotas && (
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
            {request.status === 2 && workshop && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 duration-200"
                onClick={() => {
                  setIsRecivingVehicle((prev) => !prev);
                  handleClose();
                }}
              >
                <FaCarOn size={25} />
                Receber veiculo
              </button>
            )}
            {request.status === 3 && workshop && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 duration-200"
                onClick={() => {
                  setIsSendingBudget((prev) => !prev);
                  handleClose();
                }}
              >
                <FaFileArchive size={25} />
                Anexar Orçamento
              </button>
            )}
            {request.status === 4 && workshop && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 duration-200"
                onClick={() => {
                  setIsStartingMaintenance((prev) => !prev);
                  handleClose();
                }}
              >
                <FaTools size={25} />
                Iniciar Manutenção
              </button>
            )}
            {request.status === 5 && workshop && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 duration-200"
                onClick={() => {
                  setIsFinishingMaintenance((prev) => !prev);
                  handleClose();
                }}
              >
                <FaTools size={25} />
                Finalizar Manutenção
              </button>
            )}

            {request.status === 6 && workshop && (
              <button
                className="flex items-center gap-1 p-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 duration-200"
                onClick={() => {
                  handleClose();
                  setIsDelivering((prev) => !prev);
                }}
              >
                <GiCarKey size={25} />
                Entregar veiculo
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MaintenceRequestDetails;
