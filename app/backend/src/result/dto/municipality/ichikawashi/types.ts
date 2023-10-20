import { HousingGrantDto } from './dtos/HousingGrantDto'
import { ChildbirthSupportGrantDto } from './dtos/ChildbirthSupportGrantDto'
import { PrivateRentalHousingSubsidyDto } from './dtos/PrivateRentalHousingDto'

export type IchikawashiAvailableSubsidiesDto =
  | HousingGrantDto
  | ChildbirthSupportGrantDto
  | PrivateRentalHousingSubsidyDto
