# Changelog

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