"use client";
import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngine").then((res) => res.json());
console.log(fetchModels)

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("model", fetchModels);
  const {data:model,mutate:setModel} = useSWR('', {
    fallbackData: 'text-davinci-003'
  })
  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        defaultValue={model}
        placeholder={model}
        options={models?.modelOptions}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654] text-white",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
