import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCookbookDto {
    @IsString()
    title: string;

    @IsBoolean()
    isFavorite: boolean;

    @IsBoolean()
    isPublic: boolean;

    @IsBoolean()
    isDeletable: boolean;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    coverImage?: string;
}
