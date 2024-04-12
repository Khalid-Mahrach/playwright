import {test} from '@playwright/test'

test("test env",async({page})=>{
  console.log(process.env.USERNAME_ADMIN);

});