import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setConsent } from "../../../store/slices/bookingSlice";

const Consent = () => {
  const dispatch = useDispatch();
  const { consent } = useSelector((state) => state.booking);
  const acceptConditions = () => {
    dispatch(setConsent(true));
  };
  return (
    <>
      {!consent && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-8">
          <div className="w-4/5 h-4/5 py-8 px-16 bg-white flex flex-col gap-4 ">
            <div className="flex flex-col pr-4 gap-4 text-justify h-full overflow-y-auto">
              <h1 className="text-[#00286b] text-2xl font-bold">
                Terms and Conditions
              </h1>
              <p className="text-justify">
                These terms and conditions ("Terms") govern the use of the
                online form ("Form") provided by Isha Wellness Centre
                ("Company") for the purpose of collecting patient information.
                By using this Form, you agree to be bound by these Terms. If you
                do not agree with any part of these Terms, please do not use the
                Form.
              </p>
              <h2 className="text-[#00286b] text-lg font-bold">
                1. Information Collection and Use:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  The purpose of this Form is to collect necessary information
                  for the provision of online services by the Company.
                </li>
                <li>
                  The information provided by the user will be used solely for
                  the intended purpose and in accordance with the Company's
                  Privacy Policy.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                2. Data Privacy and Security:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  The Company is committed to protecting the privacy and
                  security of user data. Please refer to our Privacy Policy for
                  more information on how we handle and protect your
                  information.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                3. Consent and Authorization:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  By submitting information through this Form, you hereby
                  consent to the collection, processing, and use of your data as
                  described in these Terms and the Company's Privacy Policy.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                4. Data Retention:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  The Company will retain collected data for the duration
                  necessary to fulfill the purpose for which it was collected,
                  unless a longer retention period is required by law.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                5. Access and Corrections:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  Users have the right to access, correct, or request the
                  deletion of their personal information. For inquiries
                  regarding your data, please contact at phone{" "}
                  <span>+91 73836 77661 </span>
                  or mail at ishawellnesscentre@gmail.com.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                6. Security Measures:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  The Company employs industry-standard security measures to
                  protect against unauthorized access, disclosure, or alteration
                  of user information.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                7. Limitation of Liability:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  The Company shall not be liable for any direct, indirect,
                  incidental, consequential, or exemplary damages resulting from
                  the use of this Form.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                8. Changes to Terms:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  The Company reserves the right to modify these Terms at any
                  time. Users are encouraged to review the Terms periodically.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                9. Governing Law:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  These Terms shall be governed by and construed in accordance
                  with the laws of [Jurisdiction], without regard to its
                  conflict of law provisions.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                10. Severability:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  If any provision of these Terms is deemed invalid or
                  unenforceable, the remaining provisions will remain in full
                  force and effect.
                </li>
              </ul>
              <h2 className="text-[#00286b] text-lg font-bold">
                11. Contact Information:
              </h2>
              <ul className=" list-disc pl-8">
                <li>
                  For any inquiries or concerns regarding these Terms, please
                  contact at phone <span>+91 73836 77661</span> or mail at
                  ishawellnesscentre@gmail.com.
                </li>
              </ul>
            </div>
            <div className="mx-auto w-fit flex gap-4">
              <button
                onClick={acceptConditions}
                className="text-[#00286b] font-semibold"
              >
                Accept
              </button>
              <Link to="/" className=" font-semibold">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Consent;
