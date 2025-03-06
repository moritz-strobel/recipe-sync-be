interface BaseEntity {
id: string;
createdAt: Date;
updatedAt: Date;
}

interface User extends BaseEntity {
username: string;
nationality: string;
email: string;
passwordHash: string;  
profileTextUrl: Text;
profileImageUrl: Image;
allowEmailNotifiaction: boolean;
allowUpdates: boolean;
allowAds: boolean;
notifiactions: Notification; // A user shal be informed if he gets followed, also when hes not signed in currently (
notifiaction on next sign in)
achievements: Achievement; // list of Refernces to Achievements
follows: User; // Reference to a user. User can follow eachother
follower: User;  
}

interface Recipe extends BaseEntity {
title: string;
user: User, // Referenz auf User
isPublic: boolean;
general_score: "healthy" | "neutral" | "unhealthy";
nutri_score: "A" | "B" | "C" | "D" | "E";
ingredients: string; // Array of strings, each string beeing a ingredient
steps: bigint; // How many steps
preperationTime: Minutes; // how long for preperation e.g. cut vegetables
overallCookingTime: Minutes; // how long for cooking
recipeText: Text; // Actual recipe text
images?: Image; // optional images embeded into recipe text, array?
videoUrl?: string // optional video link to e.g. YT
coverImage: Image; // URL zum Titelbild
categories: Category; // List of References to Categories
tags: Tag; // Array references to Tags
rating: Rating; // Array of ratings --> An average shall be displayed
views: bigint; // How many times a recipes has been viewed
shares: bigint; // How many times a recipes has been shared
comments: Comment; // Array of Comments
}

interface Tag extends BaseEntity { // A tag shall be deleted after its not referenced by a recipe anymore
name: string;
}

interface Category extends BaseEntity { // e.g. vegan --> fixed preset of categories; provided by site host
name: string;
}

interface Achievement extends BaseEntity { // e.g. vegan --> fixed preset of categories; provided by site host
name: string;
image: Image;
}

interface Rating extends BaseEntity {
userId: User; // Reference to user that rated a recipe
stars: 1 | 2 | 3 | 4 | 5;
}

interface Comment extends BaseEntity {
userId: User; // Reference to user that commented a recipe
text: string; // A comment shall only be n characters long
}

interface Notification extends BaseEntity {
message: string;
}

interface Cookbook extends BaseEntity {
user: User; // Reference to an user
title: string;
isFavorite: boolean;
isDeleteable: boolean; // e.g. every user has a list of favorite recipes. this list shall not be public nor shall it be
deleted (deletion results in empty cookbook)
isPublic: boolean;
description: string;
coverImageUrl: string; // URL zum Titelbild
recipes: Recipe; // List of references to recipes
}

/\* Methods we need

- get("EntityName") : return Entity as json
  ---> See services (read methods)

- set, delete, update method for each entity e.g. get("EntityName") : return bool
  ---> See services (CRUD methods)

- getRatingAvg() : return float
  --> calculates rating through the sum of the rating divided by the count

- search() : return List of Entities
  --> search by above entities, ingredients and combined searches of those, e.g. recipes of user x with rating > 4,3

- authenticateUser() : return (bool, errMsg)

- addRecipeToCookbook() : return bool

\*/
