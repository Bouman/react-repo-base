import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";
import Spinner from "../../components/Spinner";

function ProfilUser() {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      const getUser = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`
      );
      setData(getUser);
      setUserEmail(getUser.email);
      setUserFirstName(getUser.firstname);
      setUserLastName(getUser.lastname);
      setIsLoaded(true);
    };
    getUserData(); // lance la fonction getUserData
  }, [isLoaded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
      password: userPassword,
      admin: user.admin,
    };

    const updateUserData = async () => {
      const updateUser = await api.apiputmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`,
        body
      );
      if (updateUser.status === 204) {
        setIsSubmit(true);
        setIsLoaded(false);
      }
    };
    updateUserData();
    setShowInput(!showInput);
  };

  return isLoaded ? (
    <>
      {isSubmit && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
        >
          <div className="w-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Mise à jour réussi !
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => {
                    navigate("/user/profile", { replace: true });
                  }}
                >
                  Retour vers le Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="max-w-7xl mx-auto px-2 py-10 rounded flex flex-col mt-0">
        <div className="mx-auto w-10/12">
          <div className="w-full flex flex-row justify-center m-5"> */}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 bg-white shadow sm:rounded-lg py-10 m-10">
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <h2 className="text-2xl leading-6 font-bold text-gray-900">Profil</h2>
          <div className="flex flew-row justify-between">
            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="mt-10 flex-grow lg:mt-5 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                <div className="relative rounded-full overflow-hidden lg:block">
                  <img
                    className="relative rounded-full w-40 h-40"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="user img"
                  />
                  <label
                    htmlFor="desktop-user-photo"
                    className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-m font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                  >
                    <span>Change</span>
                    {/* <input
                    type="file"
                    id="desktop-user-photo"
                    name="user-photo"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                  /> */}
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-6 grow pl-10">
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="first-name"
                  className="block text-m font-medium text-gray-700"
                >
                  Prénom
                </label>
                {showInput ? (
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    defaultValue={userFirstName}
                    onChange={(event) => setUserFirstName(event.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                ) : (
                  <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                    {data.firstname}
                  </div>
                )}
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="last-name"
                  className="block text-m font-medium text-gray-700"
                >
                  Nom
                </label>
                {showInput ? (
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    defaultValue={userLastName}
                    onChange={(event) => setUserLastName(event.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                ) : (
                  <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                    {data.lastname}
                  </div>
                )}
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-m font-medium text-gray-700"
                >
                  E-mail
                </label>
                {showInput ? (
                  <input
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                ) : (
                  <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                    {data.email}
                  </div>
                )}
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="password"
                  className="block text-m font-medium text-gray-700"
                >
                  Mot de Passe
                </label>
                {showInput ? (
                  <input
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    type="password"
                    id="passwword"
                    name="password"
                    defaultValue={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                ) : (
                  <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                    ●●●●●●●●
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          {showInput && (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Valider
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowInput(!showInput)}
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {" "}
            {showInput
              ? "Revenir à mon profil"
              : "Modifier mes informations personnelles"}
          </button>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
  //   </div >
  // </div >
  // );
}
export default ProfilUser;
