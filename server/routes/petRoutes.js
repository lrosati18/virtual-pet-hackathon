const express = require("express");
const router = express.Router();
const fs = require("fs");

const FILE_PATH = "./data/petsData.json";

const readPets = () => {
  const petsData = fs.readFileSync(FILE_PATH);
  const parsePets = JSON.parse(petsData);

  return parsePets;
};

//GET only images with no clothes
router.get("/", (req, res) => {
  const petsData = readPets();
  const noClothes = petsData.map(({ clothes, ...rest }) => rest);
  res.status(200).json(noClothes);
});

router.get("/:id", (req, res) => {
  const petId = req.params.id;
  const petsData = readPets();
  const pet = petsData.find((pet) => pet.id === petId);
  const { clothes, ...petNoClothes } = pet;

  res.status(200).json(petNoClothes);
});

//Add name to pet that was chosen
router.post("/:id", (req, res) => {
  const newName = req.body.name;
  const petId = req.params.id;
  const petsData = readPets();
  const pet = petsData.find((pet) => pet.id === petId);
  pet.name = newName;
  fs.writeFileSync(FILE_PATH, JSON.stringify(petsData));
  res.status(201).json(pet);
});

//Show dog with clothes
//After user clicks button to dress dog, we show image with clothes on
router.get("/:id/clothes", (req, res) => {
  const petId = req.params.id;
  const petsData = readPets();
  const pet = petsData.find((pet) => pet.id === petId);
  const { noClothes, ...petWithClothes } = pet;

  res.status(200).json(petWithClothes);
});

//Hungry: Feed dog
router.post("/:id/feed", (req, res) => {
  const petId = req.params.id;
  const petsData = readPets();
  const pet = petsData.find((pet) => pet.id === petId);

  //hungry change to false
  pet.hungry = !pet.hungry;

  fs.writeFileSync(FILE_PATH, JSON.stringify(petsData));

  res.status(200).json(pet);
});

//Bored: Play with dog
router.post("/:id/play", (req, res) => {
  const petId = req.params.id;
  const petsData = readPets();
  const pet = petsData.find((pet) => pet.id === petId);

  //bored change to false
  pet.bored = !pet.bored;

  fs.writeFileSync(FILE_PATH, JSON.stringify(petsData));

  res.status(200).json(pet);
});

module.exports = router;
