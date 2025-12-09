//import appwrite SDK
import { Client, Databases, ID, Query } from "appwrite";

//import env variables
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

//create client
const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

//create database (deprec to table) instance
const database = new Databases(client);

//export function 
//updates the search count in the appwrite db
//basically adds a row to the table 
//columns are the ids
export const updateSearchCount = async (searchTerm, movie) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    // 2. If it does, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
        count: doc.count + 1,
      });
      // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//export function
//function to get the trending movies from db
//checks the most counts (how many times a user searched for the movie)
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.orderDesc("count"), //descending so highest counts come first
      Query.limit(5), //limit max trending movies return to 5
    ]);

    //bug fix: removes movies that doesn't have a poster (does not exist)
    //root cause: when users search for incomplete terms, they are recorded in the db
      //e.g. "wi" for supposed "wicked"
    const filteredDocuments = result.documents.filter(
      (doc) => doc.poster_url && doc.poster_url !== "https://image.tmdb.org/t/p/w500null"
    );
    return filteredDocuments;
  } catch (error) {
    console.error(error);
    return [];
  }
};
