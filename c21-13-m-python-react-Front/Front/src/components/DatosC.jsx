import { PrinterIcon } from "@heroicons/react/solid/FilmIcon";
import Prin from "../assets/Prin.svg"
import Descen from "../assets/Desce.svg"
import Favor from "../assets/favor.svg"


function DatosC() {
return (
    <div className="">

<div className="flex flex-col-3 justify-center gap-3 mx-10 mt-10 ">
  
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className=" flex justify-center">
          <img className=" h-48 w-22 " src={Prin} alt="Presentation Chart Icon" /></div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-justify line-clamp-3">Las empresas que utilizan el aprendizaje en linea generan más ingresos</div>
          <p className="text-gray-700 text-base text-justify">
          Según el portal Tech Jury, el aprendizaje electrónico ha ayudado a aumentar los ingresos del 42% de las organizaciones
          estadounidenses. Adicionalmente es una metodología que también le ayuda a ahorrar recursos a las compañías, ofreciéndoles
          un  excelente método de aprendizaje. El mismo portal afirmó que IBM ahorró aproximadamente $200 millones de USD después
          de cambiar su método de enseñanza al e-learning.
          </p>
        </div>
       
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="flex justify-center"><img className="h-48 w-22" src={Favor} alt="Presentation Chart Icon" /></div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-justify">En un futuro cercano esta metodología sera la favorita de las empresas</div>
          <p className="text-gray-700 text-base text-justify">
          Según el portal Finance Online, el 93% de las empresas a nivel mundial confirman que adoptarán
          el aprendizaje en línea como método en sus empresas. Esto se debe a que es una excelente manera
          de capacitar a sus empleados en el upskilling y reskilling, algo que además de contribuir al cumplimiento de las metas internas de la compañía,
          permite ser una empresa mucho más competente en cuanto a retención del talento
          </p>
        </div>
       
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className=" flex justify-center"><img className=" h-48 w-22 " src={Descen} alt="Presentation Chart Icon" /></div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Descentralización del conocimiento</div>
          <p className="text-gray-700 text-base text-justify">
          Hace ya algunos años el aprendizaje dejó de ser algo que solo se logra en una
          Universidad. Actualmente existen muchísimas plataformas de aprendizaje en
          focadas en las necesidades de cada quien y las personas buscan cursos más
          específicos y cortos que les ayuden a mejorar cierta habilidad o competencia para
          solucionar problemas inmediatos y de forma rápida. Nos enfrentamos a una abundancia de conocimiento que se vuelve cada vez
          más accesible y en algunas ocasiones gratuito, a través de muchos formatos de contenido: webinars, clases en vivo, videos de youtube, bootcamps, etc. 
          </p>
        </div>
       
      </div>
    </div>

    </div>
)
}

export default DatosC;