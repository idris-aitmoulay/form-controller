'use client'
import Image from "next/image";
import useFormControl from "../../lib/useFormControl";


function AllFieldTypesForm() {
  const { registerForm } = useFormControl();
  return(
    <form ref={ref => registerForm(ref)}>
      <fieldset>
        <div>
          <legend>Choose your favorite monster</legend>

          <input type="radio" id="kraken" name="monster" value="K"/>
          <label htmlFor="kraken">Kraken</label><br/>

          <input type="radio" id="sasquatch" name="monster" value="S"/>
          <label htmlFor="sasquatch">Sasquatch</label><br/>

          <input type="radio" id="mothman" name="monster" value="M"/>
          <label htmlFor="mothman">Mothman</label>

          <div>
            <input type="text" id="name" name="name"/>
            <label htmlFor="name">name</label>

            <input type="number" id="price" name="price" required/>
            <label htmlFor="price">price</label>
          </div>

        </div>

      </fieldset>
    </form>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AllFieldTypesForm/>
    </main>
  );
}
