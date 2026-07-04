import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdStar, MdDownload, MdEdit } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";
import { RiComputerLine } from "react-icons/ri";
import { FaRocket, FaShieldAlt } from "react-icons/fa";
import AppInfo from '../components/AppInfo';
import DataPermissionBox from '../components/DataPermissionBox';
import RatingReview from '../components/RatingReview';
import Footer from '../components/Footer';
import apps_img1 from "../assets/apps1.png";
import apps_img2 from "../assets/apps2.png";
import apps_img3 from "../assets/apps3.png";
import logo from "../assets/apps_logo.jpeg";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { BsBank } from "react-icons/bs";

const Downloadpage = () => {
  // বাংলা ব্যানার - বেটিং সম্পর্কিত
  const banners = [
    {
      image: apps_img1,
      tag: "জিত",
      title: "বাজিম্যানে আজই জিতে নিন ১০০% বোনাস!",
      tagColor: "bg-yellow-400 text-black",
    },
    {
      image: apps_img2,
      tag: "বোনাস",
      title: "সেরা বেটিং অ্যাপ!",
      tagColor: "bg-white text-black",
    },
    {
      image: apps_img3,
      tag: "৪০.১",
      title: "প্রতিদিন বড় অফার এবং ফ্রি সিগনাল!",
      tagColor: "bg-yellow-400 text-black",
    },
  ];

  // ডাউনলোড ফাংশন - বেটিং অ্যাপের জন্য
  const downloadAPK = () => {
    try {
      const apkUrl = "/BDBABU.apk";
      const fileName = "BDBABU.apk";
      
      const link = document.createElement('a');
      link.href = apkUrl;
      link.setAttribute('download', fileName);
      link.setAttribute('type', 'application/vnd.android.package-archive');
      
      const isAndroid = /Android/i.test(navigator.userAgent);
      if (isAndroid) {
        link.setAttribute('target', '_blank');
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      
    } catch (error) {
      console.error('Download error:', error);
      alert('ডাউনলোড ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      
      const externalLink = document.createElement('a');
      externalLink.href = "https://app.bdbabu.com/BDBABU.apk";
      externalLink.setAttribute('target', '_blank');
      externalLink.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(externalLink);
      externalLink.click();
      document.body.removeChild(externalLink);
    }
  };

  return (
    <section className='flex justify-center items-center bg-white'>
      <section className="h-auto w-full md:w-[95%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] m-auto">
        {/* অ্যাপ হেডার - বাজিম্যান বেটিং */}
        <div className="w-full bg-white py-[40px] mt-5 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <img
              src={logo}
              alt="BDBABU App Icon"
              className="w-[70px] h-[70px] rounded-lg border-[1px] border-gray-200"
            />
            <div>
              <h2 className="text-[23px] font-[500] flex items-center">
                BDBABU <MdVerified className="text-green-500 ml-1" />
              </h2>
              <p className="text-[#01875F] font-[600]">বিশ্বের শীর্ষ বেটিং প্ল্যাটফর্ম</p>
              <p className="text-gray-500 text-[12px] mt-[8px]">
                বিজ্ঞাপনমুক্ত, দ্রুত ট্রানজেকশন ও ২৪/৭ সাপোর্ট
              </p>
            </div>
          </div>

          {/* রেটিং ও রিভিউ - বেটিং ইউজারদের ফেক কমেন্টস */}
          <div className="flex justify-between my-4 mt-[30px] text-gray-700 pb-2 border-b border-gray-100">
            <div className="flex flex-col items-center pl-[10px] pr-[20px] border-r border-gray-200">
              <div className="flex items-center justify-center space-x-1">
                <span className="font-semibold">৪.৯</span>
                <MdStar className="text-yellow-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">৫০,০০০+ রিভিউ</p>
              <p className="text-[10px] text-green-600 mt-1">"সেরা বেটিং এক্সপেরিয়েন্স!"</p>
            </div>
            <div className="flex flex-col items-center border-r border-gray-200 pl-[10px] pr-[20px]">
              <div className="flex items-center justify-center space-x-1">
                <span className="font-semibold">১০ লাখ+</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">ডাউনলোড</p>
              <p className="text-[10px] text-green-600 mt-1">"প্রতিদিন বড় জয়!"</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="font-semibold text-gray-700 text-[25px]"><BsBank /></span>
              </div>
              <p className="text-xs text-gray-500 mt-1">ট্রাস্টেড</p>
              <p className="text-[10px] text-green-600 mt-1">"দ্রুত পেমেন্ট"</p>
            </div>
          </div>

          {/* ডাউনলোড বাটন */}
          <button
            className="w-full bg-[#01875F] cursor-pointer text-white py-3 rounded-[5px] font-[500] text-[15px] mt-3"
            onClick={downloadAPK}
          >
            BDBABU অ্যাপ ডাউনলোড করুন
          </button>

          <p className="text-gray-600 text-sm mt-4 flex items-center justify-start gap-2">
            <HiMiniDevicePhoneMobile className='text-[18px] text-[#01875F]' /> শুধুমাত্র Android ইউজারদের জন্য | দ্রুত ইনস্টল করুন এবং বোনাস পান
          </p>
        </div>

        {/* প্রমোশনাল ব্যানার - বেটিং কন্টেন্ট */}
        <div className="grid grid-cols-3 gap-[10px]">
          {banners.map((banner, index) => (
            <div
              key={index}
              className="h-[300px] bg-black rounded-lg relative overflow-hidden flex-shrink-0"
            >
              <img
                src={banner.image}
                alt="Promo"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <span className={`${banner.tagColor} text-xs px-2 py-1 rounded-full font-bold`}>
                  {banner.tag}
                </span>
                <p className="text-white text-sm font-bold mt-1">{banner.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          {/* ফেক ইউজার কমেন্টস */}
          <div className="bg-white py-4 mt-3 border-t border-gray-100">
            <h3 className="font-bold text-lg mb-3 text-gray-800">ব্যবহারকারীদের মতামত</h3>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">রাকিব হাসান</span>
                  <div className="flex text-yellow-400">
                    <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">"বাজিম্যান আসলেই অসাধারণ। প্রথম ডিপোজিটে ১০০% বোনাস পেলাম। উইথড্র খুব ফাস্ট।"</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">তাহমিনা আক্তার</span>
                  <div className="flex text-yellow-400">
                    <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">"ক্রিকেট বেটিং এর জন্য সেরা অ্যাপ। লাইভ ম্যাচ আপডেট দারুন। শুধু একটু ম্যাচের সময় ল্যাগ করে।"</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">শাহরিয়ার ইসলাম</span>
                  <div className="flex text-yellow-400">
                    <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">"গত মাসে ৫০,০০০ টাকা জিতেছি। টাকা হাতে পেয়ে খুব খুশি। বাজিম্যান দারুণ একটি প্ল্যাটফর্ম।"</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">খায়রুল বাসার</span>
                  <div className="flex text-yellow-400">
                    <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">"অ্যাপটা খুব ইউজার ফ্রেন্ডলি। কাস্টমার সাপোর্ট ২৪/৭ অনলাইন থাকে। দারুণ অভিজ্ঞতা!"</p>
              </div>
              {/* নতুন রিভিউ যোগ করা হয়েছে */}
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">জমিনুদ্দিন</span>
                  <div className="flex text-yellow-400">
                    <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">"BDBABU অ্যাপ ব্যবহার করে ৩ মাস হলো। এখনো পর্যন্ত কোনো সমস্যা হয়নি। বোনাস অফারগুলো দারুণ এবং টাকা তোলার সিস্টেম খুব দ্রুত। সবার জন্য রেকমেন্ড করবো!"</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* সিম্পল ফুটার */}
        <footer className="bg-white border-t border-gray-100 py-6 mt-5 text-center">
          <div className="text-gray-500 text-xs space-y-2">
            <p>BDBABU - বাংলাদেশের শীর্ষ বেটিং প্ল্যাটফর্ম</p>
            <p>১৮ বছর ব্যবহারকারীদের জন্য</p>
            <p>২৪/৭ কাস্টমার সাপোর্ট | দ্রুত ট্রানজেকশন | নিরাপদ বেটিং</p>
            <p className="pt-3 text-gray-400 text-[10px]">© 2026 BDBABU. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </footer>
        
      </section>
    </section>
  )
}

export default Downloadpage