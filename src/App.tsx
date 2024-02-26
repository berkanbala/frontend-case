import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import "./sel.scss";

export default function CheckSelect() {
  const [selectedOptions, setSelectedOptions] = useState([] as any);

  // const handleChange = (value: any, e: any) => {
  //   setSelectedOptions(value);
  //   console.log(e);
  // };

  const [rickAndMortyOptions, setRickAndMortyOptions] = useState([] as any);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    setSelectedOptions(value);
  };

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((res) =>
        // eslint-disable-next-line array-callback-return
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
      <Select
        value={selectedOptions}
        onChange={handleChange}
        mode="multiple"
        allowClear
        placeholder="Please select"
        // open
      >
        {rickAndMortyOptions.map((character: any, index: any) => (
          <Select.Option
            key={index}
            label={character.name}
            value={character.value}
          >
            <Checkbox
              indeterminate
              onChange={(e: any) =>
                console.log(`checked = ${e.target.checked}`)
              }
            >
              <span className="dropdown-value">{character.value}</span>
              <span>
                <img src={character.details.image} alt="character img" />
              </span>
              <div className="rickandmorty-description">
                <span className="rickandmorty-description-name">
                  {character.value}
                </span>
                <span>{character.details.episodeCount} Episodes</span>
              </div>
            </Checkbox>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
