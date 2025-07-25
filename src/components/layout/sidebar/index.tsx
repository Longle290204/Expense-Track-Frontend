import { useState } from 'react'
import { Link } from 'react-router-dom'
// logo
import logo from '../../../assets/images/logo.png'
// icons
import { MdOutlineMenuOpen } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FaRegCircleUser } from 'react-icons/fa6'
import { TiGroupOutline } from 'react-icons/ti'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineReceiptLong } from 'react-icons/md'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FaHandHoldingUsd } from 'react-icons/fa'

function Sidebar() {
  const [open, setOpen] = useState(true)

  const menuItems = [
    { icons: <AiOutlineDashboard size={25} />, label: 'Tổng quan', router: '/dashboard' },
    { icons: <FaHandHoldingUsd size={25} />, label: 'Thu nhập', router: '/income' },
    { icons: <MdOutlineShoppingCart size={25} />, label: 'Chi tiêu', router: '/spending' },
    { icons: <MdOutlineReceiptLong size={25} />, label: 'Ngân sách', router: '/budget' },
    { icons: <IoWalletOutline size={25} />, label: 'Ví', router: '/wallet' },
    { icons: <TiGroupOutline size={25} />, label: 'Nhóm', router: '/group' }
  ]

  return (
    <nav
      className={`bg-gray-50  shadow-md h-screen p-4 flex flex-col transition-all duration-400 ${open ? 'w-90' : 'w-23'}`}
    >
      {/* Header */}
      <div className='border-b border-emerald-200 px-3 py-2 h-20 flex justify-between items-center'>
        <img src={logo} alt='Logo' className={`${open ? 'w-40' : 'w-0'} transition-all duration-400 rounded-md`} />
        <MdOutlineMenuOpen
          size={30}
          className={`cursor-pointer ${!open && 'rotate-180 '} duration-400 text-green-600 hover:text-green-800`}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Body */}

      <ul className='flex-1'>
        {menuItems.map((item, index) => {
          return (
            <Link to={item.router || '/'} key={index}>
              <li className='px-3 py-2 hover:bg-emerald-100 rounded-md duration-400 cursor-pointer flex gap-4 items-center my-3 relative group'>
                <div>{item.icons}</div>
                <p className={`${!open && 'w-0 translate-x-24'} duration-400 overflow-hidden`}>{item.label}</p>
                <p
                  className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md
                duration-300
                w-0
                p-0
                pointer-events-none
                overflow-hidden
                group-hover:w-fit
                group-hover:p-2
                group-hover:left-20`}
                >
                  {item.label}
                </p>
              </li>
            </Link>
          )
        })}
      </ul>

      {/* Footer */}
      <div className='border-t border-emerald-200 flex items-center gap-4 px-3 py-2'>
        <div>
          <FaRegCircleUser size={30} />
        </div>
        <div className={`leading-5 ${!open && 'w-0 translate-x-24'} overflow-hidden duration-400`}>
          <p>ABC</p>
          <span className='text-xs text-gray-500'>longtk292@gmail.com</span>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
