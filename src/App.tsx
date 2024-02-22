import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import "./sel.scss";

export default function CheckSelect() {
  const [selectedOptions, setSelectedOptions] = useState([] as any);
  const handleChange = (value: any) => {
    setSelectedOptions(value);
  };

  const [rickAndMortyOptions, setRickAndMortyOptions] = useState([] as any);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((res) =>
        res.results.map((character: any) => {
          setRickAndMortyOptions((prevState: any) => [
            ...prevState,
            {
              value: character.name,
              label: character.name,
              details: {
                image: character.image,
                episodeCount: character.episode.length,
              },
            },
          ]);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {/* <Select onChange={(e: any) => console.log(e)} mode="multiple" open> */}
      <Select onChange={(e: any) => console.log(e)} mode="multiple">
        {rickAndMortyOptions.map((character: any) => (
          <Select.Option key={character.value} label={character.value}>
            <Checkbox
            // checked={selectedOptions.includes("johhny")}
            >
              <span className="dropdown-value">{character.value}</span>
              <span>
                <img src={character.details.image} alt="character img" />
              </span>
              <div className="rickandmorty-description">
                <span>{character.value}</span>
                <span>{character.details.episodeCount} Episodes</span>
              </div>
            </Checkbox>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
