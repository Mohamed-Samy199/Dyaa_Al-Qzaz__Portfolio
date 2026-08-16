import { Link } from "react-router-dom";

function SocialMedia() {
  return (
    <>
      <div className="grid grid-cols-5 justify-evenly">
        
        {/* Facebook */}
        <div className="col-span-1 mx-2 flex justify-center items-center">
          <Link
            target="_blank"
            to="https://www.facebook.com/dyaalqzaz"
          >
            <i className="fa-brands fa-facebook text-lightColor rounded-full p-2 text-lg border-lightColor border-[3px] hover:bg-purple-600 hover:text-white hover:border-blue-600 transition-all duration-300"></i>
          </Link>
        </div>
        
        {/* LinkedIn */}
        <div className="col-span-1 mx-2 flex justify-center items-center">
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/dyaa-al-qzaz/"
          >
            <i className="fa-brands fa-linkedin text-lightColor rounded-full p-2 text-lg border-lightColor border-[3px] hover:bg-purple-500 hover:text-white hover:border-blue-500 transition-all duration-300"></i>
          </Link>
        </div>

        {/* WhatsApp */}
        <div className="col-span-1 mx-2 flex justify-center items-center">
          <Link
            target="_blank"
            to="https://wa.me/201025056816"
          >
            <i className="fa-brands fa-whatsapp text-lightColor rounded-full p-2 text-lg border-lightColor border-[3px] hover:bg-purple-500 hover:text-white hover:border-green-500 transition-all duration-300"></i>
          </Link>
        </div>

        {/* خمسات - باستخدام حرف خ */}
        <div className="col-span-1 mx-2 flex justify-center items-center">
          <Link
            target="_blank"
            to="https://khamsat.com/user/dyaa_alqzaz"
          >
            <div className="w-9 h-9 rounded-full border-lightColor border-[3px] flex items-center justify-center text-lightColor font-bold text-lg hover:bg-purple-500 hover:text-white hover:border-orange-500 transition-all duration-300">
              خ
            </div>
          </Link>
        </div>
        
      </div>
    </>
  );
}

export default SocialMedia;