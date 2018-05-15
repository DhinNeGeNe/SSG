/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Add a shock
 * @param {krishna.ssg.ShockTransaction} ShockTransaction
 * @transaction
 */
async function shockTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.shock;

    // Update the asset with the new value.
    tx.shock = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('krishna.ssg.Shock');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.shock);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('krishna.ssg', 'ShockEvent');
    event.shock = tx.shock;
    emit(event);
}

/**
* Find a shock
**/
async function findShock(categoryIn, asOfDateIn){
  let registry = await this.bizNetworkConnection.getAssetRegistry('krishna.ssg.Shock');
  let aResources = await registry.getAll();
  // this can be intelligent.... but for now, this is okay
  let table = new Table({
    head: ['ShockId', 'Category', 'AsOfDate', 'Shock Amount']
  });
  let arrayLength = aResources.length;
  for (let i = 0; i < arrayLength; i++) {
    let categoryMatches = true;
    let dateMatches = true;
    if(category != null && aResources[i].category == categoryIn) {
        categoryMatches=true;
    }else if(category!=null){
      categoryMatches=false;
    }
    if(asOfDate != null && aResources[i].asOfDate == asOfDateIn) {
        dateMatches=true;
    }else if(asOfDate!=null){
      dateMatches=false;
    }

    if(dateMatches && categoryMatches) {
      let tableLine = [];

      tableLine.push(aResources[i].shockId);
      tableLine.push(aResources[i].category);
      tableLine.push(aResources[i].asOfDate);
      tableLine.push(aResources[i].shock_value);
      table.push(tableLine);
    }
  }
  return table;
}
