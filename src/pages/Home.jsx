import React, { useEffect, useRef, useState } from "react";

import { usePostHintsMutation } from "../app/services/hintsApi";

const Home = () => {
  const [hints, setHints] = useState({
    hints: "",
    postCodeAndAddress: "",
    shortName: "",
    fullName: "",
    innOrKnn: "",
  });
  const [ListSuggestions, setListSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const [postHints] = usePostHintsMutation();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    postHints(JSON.stringify({ query }))
      .unwrap()
      .then((res) => {
        setListSuggestions(res.suggestions);
      })
      .catch((err) => console.log(err));
  }, [hints.hints]);

  const suggestionsSubmit = (data) => {
    setShowDropdown(false);
    setQuery(data.name.full);
    setHints({
      hints: data.name.short,
      fullName: data.name.full,
      shortName: data.name.short,
      postCodeAndAddress: `${data.address.data.postal_code}, ${data.address.value}`,
      innOrKnn: `${data.inn} / ${data.kpp}`,
    });
  };

  const handleOnChange = (event) => {
    setShowDropdown(true);

    const { name, value } = event.target;
    setQuery(value);
    setHints({ ...hints, [name]: value });
  };

  const handleOnClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  return (
    <div className="space-y-6 relative h-full" onClick={handleOnClickOutside}>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Компания или ИП
        </label>
        <input
          name="hints"
          value={hints.hints}
          onChange={handleOnChange}
          type="text"
          placeholder="Введите Название, ИНН, ОГРН или адрес организации"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {ListSuggestions.length > 1 && showDropdown && (
        <div
          ref={dropdownRef}
          className="border absolute bg-white top-10 w-full border-indigo-500 space-y-2 rounded-lg"
        >
          <p className="text-gray-400">Выбрите вариант или продолжите ввод</p>
          {ListSuggestions.map(({ data }) => (
            <li
              key={data.hid}
              className="flex flex-col cursor-pointer"
              onClick={() => suggestionsSubmit(data)}
            >
              <h1>{data.name.short}</h1>
              <p className="text-gray-400">
                {data.inn} {data.address.value}
              </p>
            </li>
          ))}
        </div>
      )}

      <p>Организация (LEGAL)</p>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Краткое наименование
        </label>
        <input
          name="shortName"
          value={hints.shortName}
          onChange={handleOnChange}
          type="text"
          className="mt-1 block w-2/4 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Полное наименование
        </label>
        <input
          name="fullName"
          value={hints.fullName}
          onChange={handleOnChange}
          type="text"
          className="mt-1 block w-2/4 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          ИНН / КПП
        </label>
        <input
          name="innOrKnn"
          value={hints.innOrKnn}
          onChange={handleOnChange}
          type="text"
          className="mt-1 block w-2/4 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Адрес
        </label>
        <input
          name="postCodeAndAddress"
          value={hints.postCodeAndAddress}
          onChange={handleOnChange}
          type="text"
          className="mt-1 block w-2/4 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Home;
