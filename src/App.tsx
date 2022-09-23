import AnswersTable from "./AnswersTable";
import Graph from "./Graph";
import GraphAnswer2 from "./GraphAnswer2";
import { SurveyAnswer } from "./Interfaces";

const answers: SurveyAnswer[] = require("./answers5.json");

const App = () => {
  const answered = answers.filter((e) => e.score !== null);
  const resp = answered.length;
  const noResp = answers.length - resp;

  const prom = answered.filter((e) => e.score === 9 || e.score === 10).length;
  const neu = answered.filter((e) => e.score === 7 || e.score === 8).length;
  const det = answered.filter((e) => e.score! >= 1 && e.score! <= 6).length;

  const promedio =
    answered.reduce((prev: number, e) => prev + e.score!, 0) / resp;

  const npsScore = ((prom - det) / resp) * 100;

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg mx-auto bg-gray-50 p-3">
      <div className="w-full py-5 px-4 text-gray-700 relative">
        <div className="w-full pb-4 text-2xl font-bold text-gray-700">
          CODERHOUSE APP - NPS Septiembre 2022
        </div>
        {/*
        <div className="w-full py-0.5 text-sm font-normal text-gray-700 text-justify">
          - Según tu experiencia usando la App, ¿qué tan probable es que se la
          recomiendes a otro estudiante?
        </div>
        */}

        <table className=" text-sm text-left text-gray-700 sm:col-span-4 col-span-12 sm:col-start-8 col-start-1">
          <tbody>
            <tr className="text-gray-700">
              <td className="py-px font-bold">Usuarios alcanzados</td>
              <td className="py-px px-2">{answers.length}</td>
              <td></td>
            </tr>
            <tr className="text-gray-700">
              <td className="py-px font-bold">Respuestas</td>
              <td className="py-px px-2">{resp}</td>
              <td>{((resp * 100) / answers.length).toFixed(1)}%</td>
            </tr>
            <tr className="text-gray-700">
              <td className="py-px font-bold">No responde</td>
              <td className="py-px px-2">{noResp}</td>
              <td>{((noResp * 100) / answers.length).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
        <div className="absolute right-0 top-0 text-xs">
          Actualizado: 23/09/2022 17:35
        </div>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      <div className="my-6 grid grid-cols-12">
        <p className="text-md font-medium px-2 py-2 col-span-12">
          Según tu experiencia usando la App, ¿qué tan probable es que se la
          recomiendes a otro estudiante?
        </p>
        <div className="sm:col-span-6 col-span-12">
          <Graph answers={answered} countTotal={resp} />
        </div>

        <div className="sm:col-span-4 col-span-12 sm:col-start-8 col-start-1 align-middle flex flex-col justify-center content-start">
          <table className=" text-sm text-left text-gray-700  mb-8">
            <tbody>
              <tr className="h-4"></tr>
              <tr className="text-green-700">
                <td className="py-px font-bold">Promotores</td>
                <td className="py-px px-2">{prom}</td>
                <td>{((prom * 100) / resp).toFixed(1)}%</td>
              </tr>
              <tr className="text-orange-600">
                <td className="py-px font-bold">Neutrales</td>
                <td className="py-px px-2">{neu}</td>
                <td>{((neu * 100) / resp).toFixed(1)}%</td>
              </tr>
              <tr className="text-red-700">
                <td className="py-px font-bold">Detractores</td>
                <td className="py-px px-2">{det}</td>
                <td>{((det * 100) / resp).toFixed(1)}%</td>
              </tr>
              <tr className="h-4"></tr>
              <tr className="text-gray-700">
                <td className="py-px font-bold">Puntaje NPS</td>
                <td className="py-px px-2">{npsScore.toFixed(1)}</td>
                <td></td>
              </tr>
              <tr className="h-4"></tr>
              <tr className="text-gray-700">
                <td className="py-px font-bold">Promedio</td>
                <td className="py-px px-2">{promedio.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full h-px mb-6 bg-gray-200"></div>

      <div className="my-6 grid grid-cols-12">
        <p className="text-md font-medium px-2 py-2 col-span-12">
          ¿Cuál fue la razón principal por la que [tuviste/no tuviste] una buena
          experiencia?
        </p>
        <div className="col-span-12 h-96">
          <GraphAnswer2 answers={answered} countTotal={resp} />
        </div>
      </div>

      <div className="w-full h-px mb-6 bg-gray-200"></div>

      <AnswersTable answers={answered} />
    </div>
  );
};

export default App;
