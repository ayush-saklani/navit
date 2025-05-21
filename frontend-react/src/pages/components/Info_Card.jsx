import React from 'react';
import styled from 'styled-components';
import { VscTriangleUp } from 'react-icons/vsc';
import { LuToilet } from 'react-icons/lu';
import { PiOfficeChairBold } from 'react-icons/pi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaPeopleGroup } from 'react-icons/fa6';

const Info_Card = ({ roomname, course, section, subjectcode, roomid, type, capacity, semester, infotype, active = true }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {
          <div className={`top-section bg-gradient-to-r 
            ${type == "staffroom" ? `from-[#d97706] to-[#facc15]` :
              type == "office" ? "from-[#e76666] to-[#b469d6]" :
                type == "other" ? "from-[#cdcdcd] to-[#a09f9f]" :
                  active == false ? "from-[#5bced4] to-[#4eb7bd]" :
                    infotype == "washroom" ?
                      type == "ladieswashroom" ? "from-[#e75480] to-[#f7a1c4]"
                        : "from-[#499e9e] to-[#74e6e6]" :
                      infotype == 'occupied' ? `from-[#f14f4f] to-[#f78181]`
                        : "from-[#049fbb] to-[#50f6ff]"}`}>
            {
              infotype == "washroom" ?
                <div className="bottom-section">
                  <LuToilet className='text-[#1b233d] mx-auto mt-2' size={30} />
                  <span className="title my-2">{roomname}</span>
                </div>
                : (type == "office" || type == "other" || type == "staffroom") ?
                  <div className="bottom-section">
                    {
                      type == 'office' ? <PiOfficeChairBold className='text-[#1b233d] mx-auto mt-2' size={30} /> :
                        type == 'staffroom' ? <FaPeopleGroup className='text-[#1b233d] mx-auto mt-2' size={30} /> :
                          <HiDotsHorizontal className='text-[#1b233d] mx-auto mt-2' size={30} />
                    }
                    <span className="title my-2">{roomname} {"|"} {roomid}</span>
                  </div> :
                  <div className="bottom-section">
                    <span className="title my-2">{roomname} {"|"} {roomid}</span>
                    {
                      (infotype == 'available' || active == false) &&
                      <div className="row text-[#1b233d] grid grid-cols-2">
                        <div className="item col-span-1">
                          <span className="big-text">{capacity}</span>
                          <span className="regular-text">Capacity</span>
                        </div>
                        <div className="item col-span-1">
                          <span className="big-text">{type}</span>
                          <span className="regular-text">Room Type</span>
                        </div>
                      </div>
                    }
                    {
                      (infotype == 'occupied' && active == true) &&
                      <div className="row text-[#1b233d] mt-1 grid grid-cols-3">
                        <div className="item col-span-1">
                          <span className="big-text">{section.join(', ')}</span>
                          <span className="regular-text">Section</span>
                        </div>
                        <div className="item col-span-1">
                          <span className="big-text">{subjectcode}</span>
                          <span className="regular-text">Subject</span>
                        </div>
                        <div className="item col-span-1">
                          <span className="big-text">{semester}</span>
                          <span className="regular-text">Semester</span>
                        </div>
                      </div>
                    }
                  </div>
            }
          </div>
        }
      </div>
      <VscTriangleUp className='absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 text-[#1b233d] w-6 h-6 rotate-180' />
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
   .card {
    width: 230px;
    border-radius: 20px;
    background: #1b233d;
    padding: 5px;
    overflow: hidden;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
  }

  .card .top-section {
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .card .bottom-section {
    padding: 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card .bottom-section .title {
    display: block;
    // color: white;
    text-align: center;
  }

  .card .bottom-section .row {
    // display: flex;
    justify-content: space-between;
  }

  .card .bottom-section .row .item {
    flex: 30%;
    text-align: center;
    padding: 5px;
  }

  .card .bottom-section .row .item .big-text {
    font-size: 15px;
    display: block;
  }

  .card .bottom-section .row .item .regular-text {
    font-size: 10px;
  }

  .card .bottom-section .row .item:nth-child(2) {
    border-left: 1px solid #213a3f90;
    border-right: 1px solid #213a3f90;
  }`;

export default Info_Card;