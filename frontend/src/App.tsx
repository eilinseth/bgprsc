import { useState } from "react"
import axios from "axios"
import  {useForm} from "react-hook-form"

type FormValues = {
  asn : string
  addresListName : string
  fileName : string
}

function App() {
  const [lang,setLang] =useState<"en"|"id">("en")
  const [asn,setAsn] = useState("")
  const [addressListName , setAddressListName] = useState("")
  const [fileName,setFileName] = useState("")
  const [loading,setIsLoading] = useState(false)
  const {register , handleSubmit , formState:{errors}} = useForm<FormValues>()


  
  function onSubmit(values:FormValues){
      console.log(values.asn,values.addresListName,values.fileName)
      setIsLoading(true)

      async function getBGPJson () {
        try{
          const req = await axios.get(`http://localhost:5000/api/asn/${asn}`)
          const res =  req.data
          const data = res.data
          console.log(data)
        }
        catch(e){
          console.error(e)
        }
      }

      getBGPJson()
      setIsLoading(false)
  }
  return (
    <div className="scroll-smooth">
    <div className=" bg-gradient-to-t bg-[linear-gradient(to_top,_#ff4500,_#ff7e00,_#ffd700,_#b565d9,_#1a237e)] h-screen w-screen ">
      <div className="bg-white/20 backdrop-blur-lg w-screen h-screen ">
      <section className="px-[6%] pt-20 md:pt-50 ">
        <h1 className="font-bold text-white drop-shadow-black drop-shadow-xs text-4xl -mt-10 md:-mt-14 ">BGPview ASN to Mikrotik RSC</h1>
      </section>

        <div className="flex justify-center items-center lg:max-w-[60%] max-w-[75%] sm:-mt-1 sm:ml-10 md:-mt-5 md:ml-12 lg:ml-20 ml-8 lg:h-40  lg:-mt-2  lg:p-5 mt-2  lg:bg-slate-300/40">
          {lang === "en" ? (
            <p className="font-semibold mt-4 lg:mt-0  drop-shadow-lg drop-shadow-white text-black/70">BGPView ASN to Mikrotik RSC is a simple web tool that converts ASN prefix data from the BGPView API into a MikroTik RouterOS <span className="font-bold text-slate-800 border-black w-fit px-1 bg-gray-200">.rsc</span> script.
            This allows network administrators to quickly import complete IP ranges of a specific organization or service directly into MikroTik’s firewall address list.
            Ideal for blocking or allowing entire ASN ranges without manually adding IP addresses.</p>
          ): (
            <p className="font-semibold mt-4 lg:mt-0 drop-shadow-lg drop-shadow-white text-black/70">
              BGPView ASN to Mikrotik RSC adalah alat web sederhana yang mengonversi data prefix ASN dari API BGPView menjadi script <span className="font-bold text-slate-800 border-black w-fit px-1 bg-gray-200">.rsc</span> untuk MikroTik RouterOS.
              Dengan ini, administrator jaringan dapat dengan cepat mengimpor seluruh rentang IP dari suatu organisasi atau layanan langsung ke address list firewall MikroTik.
              Cocok untuk memblokir atau mengizinkan seluruh ASN tanpa perlu menambahkan alamat IP secara manual.
            </p>
          )} 
        </div>
          <div className="flex gap-2 lg:mt-4 lg:ml-21 md:ml-12 mt-4 ml-8 sm:ml-10">
            <button onClick={() => setLang("en")} className="bg-blue-500 text-white px-3 py-1 rounded font-bold">EN</button>
        <button onClick={() => setLang("id")} className="bg-green-500 text-white px-3 py-1 rounded font-bold">ID</button>
          </div>
      </div>
    </div>
          <div className="h-20 w-screen bg-slate-600 "></div>
        <section className="h-screen w-screen bg-slate-200 py-15  md:px-20">
          <div className="flex justify-center items-center flex-col gap-5">
            <div className="w-[85%]  h-50 md:h-[calc(100vh-150px)]">
              <form action="" className="flex gap-5 flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">

                <label htmlFor="" className="font-bold">Input ASN Number :</label>
                <input type="text" placeholder="......." className="w-40 py-0.5 px-2 bg-slate-100 rounded-xl border-2 border-black font-semibold "
                {...register("asn",{required : "Need to fill ASN Number",pattern:{value : /^\d+$/, message:"ASN must a number"}})} />
                {errors.asn && (<p className="text-red-600 font-semibold">{errors.asn.message}</p>)}
                </div>
                <div className="flex flex-col gap-2">

                <label htmlFor="" className="font-bold">Address list name :</label>
                <input type="text" placeholder="......." className="w-40 py-0.5 px-2 bg-slate-100 rounded-xl border-2 border-black font-semibold " 
                {...register("addresListName", {required: "4 character minimal " , minLength:4})}
                />

                </div>
                <div className="flex flex-col gap-2">

                <label htmlFor="" className="font-bold">File Name :</label>
                <input type="text" placeholder="......." className="w-40 py-0.5 px-2 bg-slate-100 rounded-xl border-2 border-black font-semibold " 
                {...register("fileName",{required:"4 character minimal" , minLength:4})}
                />

                </div>

                <button className="w-40 text-white font-bold cursor-pointer  bg-green-500 py-1 px-2 rounded-2xl">Submit</button>
              </form>
            </div>
            {loading && (
              <div>
                Bentar Loading
              </div>
            )}

            {!loading && (
              <div>Loading dah kelar</div>
            )}
            


          </div>
        </section>
          <div className="h-20 w-screen bg-slate-600 "></div>

        <section className="h-screen w-screen bg-blue-900 py-15 px-20">
          <div className="flex justify-center items-center gap-5">
            <div className="w-1/2 bg-amber-300 h-[calc(100vh-80px)]">

            </div>
            <div className="w-1/2 bg-red-400 h-[calc(100vh-80px)]">
            
            </div>


          </div>
        </section>
    </div>
  )
}
  


export default App
