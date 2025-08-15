import { useState } from "react"
import axios,{AxiosError} from "axios"
import  {useForm} from "react-hook-form"


type FormValues = {
  asn : string
  addresListName : string
  fileName : string
}

function App() {
  const [lang,setLang] =useState<"en"|"id">("en")
  const [loading,setIsLoading] = useState(false)
  const {register , handleSubmit , formState:{errors},reset} = useForm<FormValues>()
  const [downloadUrl,setDownloadUrl] = useState("")
  const [fileName , setFileName] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [error,setError] = useState(false)


  
  function onSubmit(values:FormValues){
      setFileName(values.fileName)
      setIsLoading(true)
      setDownloadUrl("")
    
      async function getBGPJson () {
        try{
          //fetching dari backend buat hindarin cors
          const req = await axios.get(`http://localhost:5000/api/asn/${values.asn}`)
          const res =  req.data
          const data = res.data
          if(data.ipv4_prefixes.length === 0 && data.ipv6_prefixes.length === 0){
            setError(true)
            reset()
            return
          }
          //misahin ipv4 sama ipv6
          const ipv4 = data.ipv4_prefixes.map((item : {prefix : string}) => `add address=${item.prefix} list=${values.addresListName}`)
          const ipv6 = data.ipv6_prefixes.map((item : {prefix : string}) => `add address=${item.prefix} list=${values.addresListName}`)
          //gabungin sintaks firewall di mikrotik nya
          const rscContent = `/ip firewall address-list\n${ipv4.join("\n")}\n${ipv6.join("\n")}`

          //buat file download
          const blob = new Blob([rscContent],{type:"text/plain"})
          const url  = URL.createObjectURL(blob)

          setDownloadUrl(url)
        setError(false)
        reset()

        }
        catch(err){
          if(axios.isAxiosError(err)){
            const axiosErr = err as AxiosError<{message?:string,error?:string}>
            setError(true)

            if(axiosErr.response?.data?.message){
              setErrorMessage(axiosErr.response.data.message)
            }

            else if (axiosErr.response?.data?.error) {
              setErrorMessage(axiosErr.response.data.error)
            }

            else if (axiosErr.request){
              setErrorMessage("No respond from server")
            }else{
              setErrorMessage(axiosErr.message)
            }
          }else{
            setErrorMessage("Unknown Error")
          }
        }finally{
        setIsLoading(false)
        setError(false)
        }
      }

      getBGPJson()
      
  }
  return (
    <div className="scroll-smooth">
    <div className="  bg-linear-to-b from-[#ff2904] to-[#9333EA] h-screen w-screen shadow-purple-400 ">
      <div className="bg-white/20 backdrop-blur-lg w-screen h-screen ">
      <section className="px-[6%] pt-20 md:pt-50 ">
        <h1 className="font-bold text-white drop-shadow-black drop-shadow-xs text-4xl -mt-10 md:-mt-14 ">BGPview ASN to Mikrotik RSC</h1>
      </section>

        <div className="flex justify-center items-center lg:max-w-[60%] max-w-[75%] sm:-mt-1 sm:ml-10 md:-mt-5 md:ml-12 lg:ml-20 ml-8 lg:h-40  lg:-mt-2  lg:p-5 mt-2  lg:bg-slate-300/40 shadow-lg shadow-white rounded-lg">
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
          <div className="h-20 w-screen bg-gradient-to-b from-purple-300  to-blue-50 "></div>
        <section className="min-h-screen w-screen bg-gradient-to-b from-blue-50 to-blue-100 py-15  md:px-20 " >
          <h1 className="text-center mb-10 text-4xl bg-linear-90 md:mb-20 from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent font-bold">Generate Mikrotik Firewall Script</h1>
          
          <div className="flex justify-center items-center flex-col gap-5">
            <div className="w-[85%]  h-50 md:h-[calc(100vh-150px)]">
              <form action="" className="flex gap-8 flex-col justify-center items-center bg-linear-90 from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent text-lg " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold">Input ASN Number :</label>
                <input type="text" placeholder="......." className="text-black py-0.5 px-2 bg-slate-100  font-semibold w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("asn",{required : "Cannot Empty",pattern:{value : /^\d+$/, message:"ASN must a number"}})} />
                    {errors.asn && (<p className="text-red-600 md:-mt-1 md:-mb-2 font-semibold">{errors.asn.message}</p>)}
                </div>
                <div className="flex flex-col gap-2">

                <label htmlFor="" className="font-bold">Address list name :</label>
                <input type="text" placeholder="......." className="text-black py-0.5 px-2 bg-slate-100  font-semibold w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                {...register("addresListName", {required:{value:true,message: "Cannot Empty "} , minLength:{value:4 , message:"Minimal 4 Character"}})}
                />
                    {errors.addresListName && (<p className="text-red-600 md:-mt-1 md:-mb-2 font-semibold">{errors.addresListName.message}</p>)}
                </div>
                <div className="flex flex-col gap-2">

                <label htmlFor="" className="font-bold">File Name :</label>
                <input type="text" placeholder="......." className="text-black py-0.5 px-2 bg-slate-100  font-semibold w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                {...register("fileName",{required:{value:true , message:"Cannot Empty" }, minLength:{value : 4 , message : "Minimal 4 Character"}})}
                />
                    { errors.fileName && (<p className="text-red-600 md:-mt-1 md:-mb-2 font-semibold">{errors.fileName.message}</p>)}
                </div>

                <button className="w-40 text-white font-bold cursor-pointer  bg-green-500 py-1 px-2 rounded-2xl">Submit</button>
              </form>
            </div>

            {loading &&  (
              <div className="mt-10 md:-mt-30 flex flex-col gap-4 justify-center items-center">
                <p className="text-purple-500 text-2xl font-semibold">Loading...</p>
                <div className="w-10 h-10 border-2 border-t-transparent border-[navy] rounded-full animate-spin"></div>
              </div>
            )}

            {!loading && !downloadUrl && error && (
              <div className="mt-30 md:-mt-30 flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl text-red-600 font-semibold">{errorMessage}</p>
              </div>
            )}

            {!loading && downloadUrl && (
              <div className="mt-30 md:-mt-30 flex flex-col gap-4 justify-center items-center"><p className="text-purple-500 text-2xl font-semibold">Loading is done</p>
                <a href={downloadUrl}
                download={`${fileName}.rsc`}
                className="bg-green-600 text-white px-4 py-2 rounded font-bold"
                >Download {fileName}.rsc</a>
              </div>
              
            )}
            


          </div>
        </section>
          <div className="h-20 w-screen bg-gradient-to-b from-blue-100 to-slate-300 "></div>

        <section className="min-h-screen w-screen bg-gradient-to-b from-slate-300 to-blue-900 py-15 px-20">
          <div className="flex justify-center items-center gap-5">
            <div className="w-[75%]  h-[calc(100vh-80px)]">
                <h1 className="text-4xl text-center font-bold bg-linear-90 from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent drop-shadow-white drop-shadow-lg">How it Works</h1>
            </div>
            


          </div>
        </section>
    </div>
  )
}
  


export default App
