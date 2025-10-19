buildings
    query
      buildings
        type (farm, lumber-mill, steel-plant, gas-field)
        level (output, cap)
        collectedAt (without timer, need to collect action)
        timeToUpgrade (timer, change building stats)
    mutations
      boostBuilding
      collectBuilding
      upgradeBuilding
      speedupBuilding
    subscriptions
      buildingsChanged (count, level, collectedAt)
