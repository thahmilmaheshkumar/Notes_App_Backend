import express from "express";
import note from "../models/note.js";
import errorhandler from "../helper/errorhandler.js";

export const getAllNotes = async (req, res) => {
  const id = req.user;
  const result = await note.find({ user_id: id });
  res.status(200).json({ success: true, result });
};

export const createNotes = async (req, res, next) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ success: false, message: "Write a require data" });
    const id = req.user;
    req.body.user_id = id;
    const newNote = await note.create({ user_id: id, note: req.body.note });
    res.status(201).json({ success: true, newNote });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Internal server error" });
  }
};

export const update = async (req, res, next) => {
  if (!req.body)
    return res
      .status(400)
      .json({ success: false, message: "Write a require data" });
  const id = req.query.id;
  const updated = await note.findByIdAndUpdate(id, req.body);
  res.status(200).json({ success: true, updated });
};

export const deleted = async (req, res, next) => {
  const id = req.query.id;
  const deleted = await note.findByIdAndDelete({ _id: id });
  if (!deleted)
    return res
      .status(400)
      .json({ success: false, message: "No such data found" });
  res.status(200).json({ success: true, deleted });
};
