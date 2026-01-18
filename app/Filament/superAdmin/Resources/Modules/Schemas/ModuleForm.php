<?php

namespace App\Filament\SuperAdmin\Resources\Modules\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Validation\ValidationException;

class ModuleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make("title")
                ->required()
                ->minLength(5)
                ->helperText("Enter the title of the module."),

            RichEditor::make("description")
                ->required()
                ->minLength(10)
                ->helperText("enter the brief description of the module.")
             ->fileAttachmentsDisk('r2')
                ->fileAttachmentsDirectory('editor-uploads')
                ->fileAttachmentsVisibility('public')
                ->toolbarButtons([
                    'bold', 'italic', 'underline', 'strike',
                    'bulletList', 'orderedList', 'link',
                    'h2', 'h3', 'blockquote', 'codeBlock',
                    'attachFiles', 'undo', 'redo',
                ]),


                 // thumbnail as image
                FileUpload::make("thumbnail_url")
                ->disk('r2')
                ->directory('thumbnails')
                ->image()
                ->preserveFilenames()
                ->visibility('public')
                ->acceptedFileTypes(['image/*'])
                ->required(),

                // file as download link
                FileUpload::make("file_url")
                ->disk('r2')
                 ->directory('files')
                ->preserveFilenames()
                ->visibility('public')
                ->required()
                 ->acceptedFileTypes(['application/pdf']) ,

              Hidden::make('user_id'),
              Hidden::make('author_name'),


            ]);
}
}
