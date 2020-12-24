import dayjs from "dayjs";


export const fetchShoppingList = async (store:any)=>{
	const startDate = dayjs(dayjs().day(0)).format("DD/MM/YYYY");
    const startDay = dayjs(dayjs().day(0)).format("DD");

    const endDay = dayjs(dayjs().day(6)).format("DD");
    const startMonth = dayjs(dayjs().day(0)).format("MMMM");
    const endMonth = dayjs(dayjs().day(6)).format("MMMM");

    const dateString =
      startMonth === endMonth
        ? `${startDay}-${endDay} ${startMonth}`
		: `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
		
	let message;
	let aisleListWithIngredients: any = [];
	const shoppingList = await fetch(`/api/shopping-list`, {
		method: "GET",
		headers: {
		  "Content-Type": "application/json",
		  accessToken: store.state.accessToken
		}
	  }).then(res => res.json());
  
	  
  
	  // console.log(shoppingList);
  
	  if (shoppingList.ingredients) {
		//full array
		// console.log(shoppingList.ingredients);
		let idList: any = [];
		let aisleList: any = [];
  
		shoppingList.ingredients.forEach((ingredient: any) => {
		  idList.push(ingredient.id);
		  aisleList.push(ingredient.aisle);
		});
		idList = new Set(idList);
		aisleList = new Set(aisleList);
  
		// idList.forEach((id: number) => {
		//   console.log(id);
		// });
		let ingFilteredByIdList: any = [];
		const idArray = [...idList];
		idArray.forEach((id: number) => {
		  const ingFilteredById = shoppingList.ingredients.filter(
			(ing: any) => ing.id === id
		  );
		  ingFilteredByIdList.push(ingFilteredById);
		});
		// console.log(ingFilteredByIdList);
  
		ingFilteredByIdList.forEach((idArray: any, i: number) => {
		  if (idArray.length > 1) {
			//if there are multiple ingredients with same ID
  
			let finalArray: any = [];
			let measureMap = idArray.map((id: any) => id.measure);
			// .reduce((acc: any, cv: any) => {
			//   return acc.amount + cv.amount;
			// });
			measureMap = new Set(measureMap);
			measureMap = [...measureMap];
			// console.log(measureMap);
			if (measureMap.length > 1) {
			  //if the ingredients have different units
			  measureMap.forEach((el: any, i: number) => {
				let measureFilter = idArray.filter(
				  (ing: any) => ing.measure === el
				);
				// console.log(measureFilter);
				if (measureFilter.length > 1) {
				  //unit has more than one instance
				  const egSum = measureFilter.reduce((acc: any, cv: any) => {
					// console.log(measureFilter);
					return { amount: acc.amount + cv.amount };
				  });
				  let { amount: ingSum } = egSum;
				  if (String(ingSum).includes(".")) {
					const amountInt = Math.floor(ingSum);
					let amountDecimal = ingSum - amountInt;
  
					if (amountDecimal !== 0.5) {
					  ingSum = ingSum.toFixed(2);
					}
				  }
  
				  finalArray.push({ ...measureFilter[0], amount: ingSum });
				} else {
				  // unit has only one instance
				  // console.log({ ...measureFilter[0] }, "mf");
				  finalArray.push(measureFilter[0]);
				}
			  });
			  ingFilteredByIdList[i] = finalArray;
			} else {
			  //ingredients have same unit but different amounts
			  const egSum = idArray.reduce((acc: any, cv: any) => {
				return { amount: acc.amount + cv.amount };
			  });
			  let { amount: ingSum } = egSum;
			  if (String(ingSum).includes(".")) {
				const amountInt = Math.floor(ingSum);
				let amountDecimal = ingSum - amountInt;
  
				if (amountDecimal !== 0.5) {
				  ingSum = ingSum.toFixed(2);
				}
			  }
			  ingFilteredByIdList[i] = [{ ...idArray[0], amount: ingSum }];
			  // console.log(idArray, "same unit diff amount array");
  
			  return;
  
			  // console.log(idArray[0].name, ingSum, "same unit diff amount sum");
			}
		  }
		});
		//separate each array into own object
		ingFilteredByIdList = ingFilteredByIdList.flatMap((el: any) => el);
		// console.log(ingFilteredByIdList);
		//rethink end
  
		// console.log(aisleList);
		// ingFilteredByIdList.forEach((el:any) => {
  
		// });
		aisleList.forEach((aisle: string) => {
		  const ingredients = ingFilteredByIdList.filter(
			(ingredient: any) => ingredient.aisle === aisle
		  );
		  // console.log(ingredients);
		  let ingredientObject: any = {
			aisle,
			ingredients: []
		  };
		  if (ingredients.length > 1) {
			let idList = ingredients.map((el: any) => el.id);
			idList = new Set(idList);
			idList = [...idList];
			// console.log(ingredients);
			// console.log(idList);
  
			idList.forEach((id: number) => {
			  let ingFilterByIdAndAisle = ingredients.filter(
				(ing: any) => ing.id === id
			  );
			  if (ingFilterByIdAndAisle[0].amount > 1) {
				ingFilterByIdAndAisle[0].measure =
				  ingFilterByIdAndAisle[0].measure.slice(-1) === "s"
					? ingFilterByIdAndAisle[0].measure
					: ingFilterByIdAndAisle[0].measure + "s";
			  }
			  
			  ingredientObject.ingredients.push(ingFilterByIdAndAisle);
  
			 
			});
			aisleListWithIngredients.push(ingredientObject);
  
		   
		  } else {
			ingredientObject = {
			  aisle,
			  ingredients: [ingredients]
			};
  
			aisleListWithIngredients.push(ingredientObject);
		  }
		});
		
		return {
			shoppingList,
			aisleListWithIngredients,
			dateString,
			message: null
		  };
	  } else {
		return {
			message:"No shopping list found",
			dateString,
		}
	  }
	
}