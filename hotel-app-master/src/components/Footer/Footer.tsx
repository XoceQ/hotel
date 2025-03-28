import Link from 'next/link';
import {BsFillSendFill, BsTelephoneOutbound} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";

const Footer = () => {
    return (
        <footer className='mt-16'>
                <div className='container mx-auto px-4'>
                    <Link href='/' className='font-black text-tertiary-dark'>
                        Hotel App
                    </Link>
                    <h4 className='font-semibold text-[40px] py-6 '>Contact</h4>

                    <div className='flex flex-wrap gap-16 items-center justify-between'>
                        <div className='flex-1'>
                            <p> Tv. 16a #45F-16</p>
                            <div className='flex items-center py-4'>
                                <BsFillSendFill/>
                                <p className="ml-2">code with Kose</p>
                            </div>
                            <div className='flex items-center '>
                                <BsTelephoneOutbound/>
                                <p className="ml-2">315-399-32-02</p>
                            </div>
                            <div className='flex items-center py-4'>
                                <BiMessageDetail/>
                                <p className="ml-2">dcurbanxtreme@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex-1 md-text-right">
                            <p className="pb-4">Our story</p>
                            <p className="pb-4">Get in touch</p>
                            <p className="pb-4">Our privacy commitment</p>
                            <p className="pb-4">Terms of services</p>
                            <p> Customer Asssitance</p>
                        </div>
                        <div className='flex-1 md:text-right'>
                            <p className='pb-4'>Dining Experience</p>
                            <p className='pb-4'>Wellness</p>
                            <p className='pb-4'>Fitness</p>
                            <p className='pb-4'>Sports</p>
                            <p>Events</p>
                        </div>
                    </div>

                </div>
            <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0'></div>
        </footer>
    );
};
export default Footer;