import React, { useState } from "react";
import nit_logo from "../assets/nit_logo.png";
// import { UserCircle } from "lucide-react";
import { AdminApiResponseType, MeApiResponseType, logoutApi } from "../api";
import { Link, useNavigate } from "react-router-dom";
import handleError from "../utils/handleError";
import { getImageUrl } from "../utils/getImageUrl";

interface Props {
  me: MeApiResponseType | AdminApiResponseType | null;
}

export default function Navbar({ me }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await logoutApi();
      
      navigate('/');
      window.location.reload();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
        borderRadius: "20px",
      }}
      className="flex justify-between items-center p-2"
    >
      <Link to="/">
        <div className="flex items-center">
          <img src={nit_logo} alt="nit_logo" className="w-24" />
          <div className="text-primary font-bold text-xl">
            <p>National Institute of Technology,</p>
            <p>Kurukshetra</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-3">
          <img
            src={getImageUrl(
              me?.profilePhotoId
                ? `${import.meta.env.VITE_API_URL}/api/file/get/${
                    me?.profilePhotoId
                  }`
                : null,
              me?.name
            )}
            alt="user_avatar"
            className="w-14 h-14 rounded-full"
          />
          { /*@ts-ignore */ }
          <p className="capitalize text-primary text-xl">{me?.rollNumber}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={me?.roles === "admin" ? "/admin/rebate" : "/rebate"}>
            <button className="capitalize text-primary text-xl">Rebate</button>
          </Link>
          {me?.roles !== "admin" && (
            <Link to={me?.roles === "admin" ? "/admin/profile" : "/profile"}>
              <button className="capitalize text-primary text-xl">
                Profile
              </button>
            </Link>
          )}
          <Link to={me?.roles === "admin" ? "/admin/messBill" : "/messBill"}>
            <button className="capitalize text-primary text-xl">
              MessBill
            </button>
          </Link>
          {/* <Link to={me?.roles === "admin" ? "/admin/messMenu" : "/messMenu"}>
            <button className="capitalize text-primary text-xl">
              MessMenu
            </button>
          </Link> */}
          <button
            className="capitalize text-primary text-xl"
            onClick={handleLogout}
            disabled={isLoading}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
