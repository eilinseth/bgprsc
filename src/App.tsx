import { useState } from "react"



function App() {
  const [lang,setLang] =useState<"en"|"id">("en")
  
  return (
    <div className=" bg-gradient-to-t bg-[linear-gradient(to_top,_#ff4500,_#ff7e00,_#ffd700,_#b565d9,_#1a237e)] min-h-screen w-screen ">
      <div className="bg-white/20 backdrop-blur-lg w-screen min-h-screen ">
      <section className="px-[6%] pt-20 md:pt-50 ">
        <h1 className="font-bold text-white drop-shadow-black drop-shadow-xs text-4xl -mt-10 md:-mt-14 ">BGPview JSON to Mikrotik RSC</h1>
      </section>

        <div className="flex justify-center items-center lg:max-w-[60%] max-w-[75%] sm:-mt-1 sm:ml-10 md:-mt-5 md:ml-12 lg:ml-20 ml-8 lg:h-40  lg:-mt-2  lg:p-5 mt-2  lg:bg-slate-300/40">
          {lang === "en" ? (
            <p className="font-semibold mt-4 lg:mt-0  drop-shadow-lg drop-shadow-white text-black/70">BGPView JSON to Mikrotik RSC is a simple web tool that converts ASN prefix data from the BGPView API into a MikroTik RouterOS <span className="font-bold text-slate-800 border-black w-fit px-1 bg-gray-200">.rsc</span> script.
            This allows network administrators to quickly import complete IP ranges of a specific organization or service directly into MikroTik’s firewall address list.
            Ideal for blocking or allowing entire ASN ranges without manually adding IP addresses.</p>
          ): (
            <p className="font-semibold mt-4 lg:mt-0 drop-shadow-lg drop-shadow-white text-black/70">
              BGPView JSON to Mikrotik RSC adalah alat web sederhana yang mengonversi data prefix ASN dari API BGPView menjadi script <span className="font-bold text-slate-800 border-black w-fit px-1 bg-gray-200">.rsc</span> untuk MikroTik RouterOS.
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
  )
}
  


export default App
