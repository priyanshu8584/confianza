import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  menu:defineTable({
  
    item:v.string(),
    price:v.number(),
    date:v.string()
  }),
  image:defineTable({
  
storageId:v.string()
  }),
  users:defineTable({
   name:v.string(),
   userId:v.string(),
    email:v.string(),
    isAdmin:v.boolean()
  }),
  orders:defineTable({
     name:v.string(),
     date:v.string(),
     items:v.string(),
     numberOfPeople:v.number(),
     floor:v.number(),
     department:v.string(),
     phoneNumber:v.string()

  })
})