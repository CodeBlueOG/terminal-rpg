# Changelog

# Changelog

## [0.4.0] - 2026-07-12

### Added

* Added a main menu with New Game, Continue Game, and Exit options.
* Added save-game loading from `saveData.json`.
* Added the ability to continue a saved game from The Last Campfire.
* Added a Save Game option to the camp menu.

### Changed

* Loaded save data now restores the existing player object using `Object.assign()`.
* New games now begin through the main menu.

### Fixed

* Fixed the misspelled `inventory.js` filename that prevented the inventory module from loading.

## [0.3.2]

### Added

* Added The Last Campfire menu.
* Added resting to restore health and mana.
* Added player stat viewing from camp.
* Added an inventory menu.
* Added the camp merchant.
* Added merchant unlocking after game progression.
* Moved the shop system into the camp.

## v0.3.1

### Added
- Added Mana Potion usage during battle.
- Added Mana Potions to battle stat displays.
- Added maximum health and maximum mana limits.

### Changed
- Updated area level requirements to create odd-numbered main-area progression.
- Positioned boss areas between main areas using even-numbered level requirements.

### Fixed
- Fixed Mana Potions restoring mana immediately when purchased instead of being added to inventory.
- Fixed Health and Mana Potions allowing stats to exceed their maximum values.
- Fixed unusable potions consuming the player's battle turn.

## [0.3.0] - 2026-07-07

### Added

* Added the first story and progression system.
* Added timed story text playback.
* Added one-time story event tracking.
* Added opening story sequence before and after character naming.
* Added Lost Forest introduction story event.
* Added Dawnshard awakening sequence.
* Added player story-state tracking for first use of Charged Light Beam.
* Added story events triggered by area progression and player actions.

### Changed

* Updated the opening of the game to introduce The Dimming and the mysterious light.
* Changed Dawnshard discovery so the shard is already within the player and awakens after the first Charged Light Beam use.

## v0.2.0

### Added
- Progressive XP and leveling system
- Scaling XP requirements for each level
- XP progress display showing current XP and XP needed
- Dynamic area unlocking based on player level
- Special attack charge display
- Automatic targeting when only one enemy remains

### Changed
- Defeated enemies now disappear from the active battle list
- Travel menu now only displays unlocked areas
- Shop and Quit options now renumber automatically
- Special attacks no longer waste a turn when not fully charged
- Refactored the game into multiple JavaScript modules

### Project Structure
- Moved enemy, area, and shop data into separate data files
- Moved input and random-number functions into utility files
- Moved player logic into its own module
- Moved battle, shop, and travel systems into separate modules

### Fixed
- Fixed weapon attacks being skipped after weapon selection
- Fixed GreatSword appearing to deal no damage
- Fixed enemy targeting after defeated enemies were removed from the active list

## v0.1.0

### Added
- Initial GitHub release
- Basic combat system
- Weapons
- Potions
- Mana
- Enemy battles