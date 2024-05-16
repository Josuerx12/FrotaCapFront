import {
  FaCalendarCheck,
  FaCalendarPlus,
  FaDownload,
  FaFileArchive,
  FaTools,
  FaTrash,
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
import IsDeletingModal from "../actions/isDeleting";
import { GrDocumentPdf } from "react-icons/gr";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const MaintenceRequestDetails = ({ show, handleClose, request }: Props) => {
  const { user } = useAuth();

  const [isScheduling, setIsScheduling] = useState(false);
  const [isFinishSchedule, setIsFinishScheduling] = useState(false);
  const [isRecivingVehicle, setIsRecivingVehicle] = useState(false);
  const [isSendingBudget, setIsSendingBudget] = useState(false);
  const [isStartingMaintenance, setIsStartingMaintenance] = useState(false);
  const [isFinishingMaintenance, setIsFinishingMaintenance] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <IsDeletingModal
        request={request}
        show={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
      />
      <Modal
        isOpen={show}
        modalName="Detalhes da solicitação"
        hidden={handleClose}
        isClickOutHiddeble={true}
      >
        <div className="w-full flex justify-end">
          {user?.admin && (
            <button
              onClick={() => {
                handleClose();
                setIsDeleting((prev) => !prev);
              }}
              className="bg-red-500 p-2 rounded flex text-white text-lg items-center gap-2"
            >
              Deletar <FaTrash />
            </button>
          )}
        </div>
        <form>
          <div className="flex flex-col gap-2">
            {request.protocol && (
              <h2 className="text-xl">
                <span className="font-bold">Nº Protocolo: </span>{" "}
                {request.protocol}
              </h2>
            )}
            {request.os && (
              <div className="flex flex-col gap-1">
                <h2>
                  Numero da O.S. <span>{request.os}</span>
                </h2>
                {request.osDocuments && request.osDocuments?.length > 0 && (
                  <a
                    className="text-blue-600 hover:text-blue-400 cursor-pointer w-fit flex gap-1 items-center"
                    title="Baixar Ordem de Serviço em PDF!"
                    href={request.osDocuments[0].url}
                    download={true}
                  >
                    Baixar O.S. <GrDocumentPdf />
                  </a>
                )}
              </div>
            )}

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

            {request.evidence && request.evidence.length > 0 && (
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-xl">Evidenciais</h3>

                <div className="flex gap-6 flex-wrap">
                  {request.evidence.map((ev) => (
                    <div key={ev.id} className="flex flex-col gap-4">
                      <img
                        className="w-44 h-44 hover:scale-110 duration-300 cursor-pointer ease-in-out border-2 rounded-lg shadow-lg bg-black"
                        src={ev.url}
                        alt={`Evidencia id: ${ev.id}`}
                      />
                      <a
                        className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-600 active:bg-neutral-500 duration-200 text-white p-2 rounded"
                        href={ev.url}
                        title={"Clique para baixa a evidencia Nº " + ev.id}
                        download={true}
                        target="_blank"
                      >
                        Baixar Evidencia <FaDownload />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
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
