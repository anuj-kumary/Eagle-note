import { Response } from 'miragejs';
import { requiresAuth } from '../utils/authUtils';

/**
 * All the routes related to Trash are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all trashed notes in the db.
 * send GET Request at /api/trash
 * */

export const getAllTrashedNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    new Response(
      404,
      {},
      {
        errors: ['The email you entered is not Registered. Not Found error'],
      }
    );
  }
  return new Response(200, {}, { trash: user.trash });
};

/**
 * This handler handles trashing a note
 * send POST Request at /api/notes/trash/:noteId
 * body contains {note}
 * */

export const moveToTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    const { noteId } = request.params;
    const trashedNote = user.notes.filter((note) => note._id === noteId)[0];
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.trash.push({ ...trashedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { trash: user.trash, notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles deleting note from trash.
 * send DELETE Request at /api/trash/delete/:noteId
 * */

export const deleteFromTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    new Response(
      404,
      {},
      {
        errors: ['The email you entered is not Registered. Not Found error'],
      }
    );
  }
  const { noteId } = request.params;
  user.trash = user.trash.filter((note) => note._id !== noteId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash });
};

/**
 * This handler handles restoring the trashed notes to user notes.
 * send POST Request at /api/trash/restore/:noteId
 * */

export const restoreFromTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    new Response(
      404,
      {},
      {
        errors: ['The email you entered is not Registered. Not Found error'],
      }
    );
  }
  const { noteId } = request.params;
  const restoredNote = user.trash.filter((note) => note._id === noteId)[0];
  user.trash = user.trash.filter((note) => note._id !== noteId);
  user.notes.push({ ...restoredNote });
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash, notes: user.notes });
};
