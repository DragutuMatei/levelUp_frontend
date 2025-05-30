import { Link } from "react-router-dom";
import "../assets/css/style.scss";

function Pov() {
  return (
    <div className="pov">
      <p>
        Aerul greu de sesiune părea mult mai apăsător dintr-o dată. Ceva
        plutește în aer însă examenele nu par a fi de vină. Hanga Mihail,
        Secretar General al OSFIIR este la ușa camerei Președintelui OSFIIR,
        Andrei Diaconu, cu care vorbise să se întâlnească pentru a discuta
        despre niște documente urgente legate de fondurile asociației. Mihail a
        deschis ușa camerei și s-a autoinvita căci Andrei nu răspundea la
        bătăile în ușă. Groază, tristețe, nedreptate, intrigare sunt doar câteva
        sentimente ce l-au încercat pe Mihail când a văzut ce ascundeau pereții
        camerei.
      </p>
      <p>
        Andrei zăcea inert, orice urmă de viață lăsase corpul său vacant. Cu
        timpul înghețat parcă, Mihail schițează un apel la 112, iar până la
        sosirea echipajelor acesta rămâne ațintit asupra scenei grotești. Cu
        sunetul de sirene înfundat, aerul rece ce plutea și o imagine pe care nu
        credea că o vedea, Mihail reușește să schimbe direcția privirii către
        biroul lui Andrei. Ca o pată strălucitoare în toata scena, un sertar
        deschis și golit. Nu orice sertar. Sertarul în care Andrei obișnuia să
        țină fondul de urgență al asociației era acum gol. Mihail a realizat ce
        se întâmplă: Andrei a fost ucis iar banii au dispărut, nu pare a fi o
        coincidență ci mai degrabă ceva premeditat. Crima și furtul.
      </p>
      <Link className="button main" to="/level1">
        <h1>Level 1</h1>
      </Link>
    </div>
  );
}

export default Pov;
