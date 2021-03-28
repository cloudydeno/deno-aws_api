// Autogenerated API structures for: Amazon Polly

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface DeleteLexiconInput {
  Name: string;
}

// refs: 1 - tags: named, input
export interface DescribeVoicesInput {
  Engine?: Engine | null;
  LanguageCode?: LanguageCode | null;
  IncludeAdditionalLanguageCodes?: boolean | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface GetLexiconInput {
  Name: string;
}

// refs: 1 - tags: named, input
export interface GetSpeechSynthesisTaskInput {
  TaskId: string;
}

// refs: 1 - tags: named, input
export interface ListLexiconsInput {
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListSpeechSynthesisTasksInput {
  MaxResults?: number | null;
  NextToken?: string | null;
  Status?: TaskStatus | null;
}

// refs: 1 - tags: named, input
export interface PutLexiconInput {
  Name: string;
  Content: string;
}

// refs: 1 - tags: named, input
export interface StartSpeechSynthesisTaskInput {
  Engine?: Engine | null;
  LanguageCode?: LanguageCode | null;
  LexiconNames?: string[] | null;
  OutputFormat: OutputFormat;
  OutputS3BucketName: string;
  OutputS3KeyPrefix?: string | null;
  SampleRate?: string | null;
  SnsTopicArn?: string | null;
  SpeechMarkTypes?: SpeechMarkType[] | null;
  Text: string;
  TextType?: TextType | null;
  VoiceId: VoiceId;
}

// refs: 1 - tags: named, input
export interface SynthesizeSpeechInput {
  Engine?: Engine | null;
  LanguageCode?: LanguageCode | null;
  LexiconNames?: string[] | null;
  OutputFormat: OutputFormat;
  SampleRate?: string | null;
  SpeechMarkTypes?: SpeechMarkType[] | null;
  Text: string;
  TextType?: TextType | null;
  VoiceId: VoiceId;
}

// refs: 1 - tags: named, output
export interface DescribeVoicesOutput {
  Voices?: Voice[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GetLexiconOutput {
  Lexicon?: Lexicon | null;
  LexiconAttributes?: LexiconAttributes | null;
}

// refs: 1 - tags: named, output
export interface GetSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask | null;
}

// refs: 1 - tags: named, output
export interface ListLexiconsOutput {
  Lexicons?: LexiconDescription[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListSpeechSynthesisTasksOutput {
  NextToken?: string | null;
  SynthesisTasks?: SynthesisTask[] | null;
}

// refs: 1 - tags: named, output
export interface StartSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask | null;
}

// refs: 1 - tags: named, output
export interface SynthesizeSpeechOutput {
  AudioStream?: Uint8Array | string | null;
  ContentType?: string | null;
  RequestCharacters?: number | null;
}

// refs: 7 - tags: input, named, enum, output
export type Engine =
| "standard"
| "neural"
| cmnP.UnexpectedEnumValue;

// refs: 10 - tags: input, named, enum, output
export type LanguageCode =
| "arb"
| "cmn-CN"
| "cy-GB"
| "da-DK"
| "de-DE"
| "en-AU"
| "en-GB"
| "en-GB-WLS"
| "en-IN"
| "en-US"
| "es-ES"
| "es-MX"
| "es-US"
| "fr-CA"
| "fr-FR"
| "is-IS"
| "it-IT"
| "ja-JP"
| "hi-IN"
| "ko-KR"
| "nb-NO"
| "nl-NL"
| "pl-PL"
| "pt-BR"
| "pt-PT"
| "ro-RO"
| "ru-RU"
| "sv-SE"
| "tr-TR"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, enum, output
export type TaskStatus =
| "scheduled"
| "inProgress"
| "completed"
| "failed"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type OutputFormat =
| "json"
| "mp3"
| "ogg_vorbis"
| "pcm"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type SpeechMarkType =
| "sentence"
| "ssml"
| "viseme"
| "word"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type TextType =
| "ssml"
| "text"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, enum, output
export type VoiceId =
| "Aditi"
| "Amy"
| "Astrid"
| "Bianca"
| "Brian"
| "Camila"
| "Carla"
| "Carmen"
| "Celine"
| "Chantal"
| "Conchita"
| "Cristiano"
| "Dora"
| "Emma"
| "Enrique"
| "Ewa"
| "Filiz"
| "Geraint"
| "Giorgio"
| "Gwyneth"
| "Hans"
| "Ines"
| "Ivy"
| "Jacek"
| "Jan"
| "Joanna"
| "Joey"
| "Justin"
| "Karl"
| "Kendra"
| "Kevin"
| "Kimberly"
| "Lea"
| "Liv"
| "Lotte"
| "Lucia"
| "Lupe"
| "Mads"
| "Maja"
| "Marlene"
| "Mathieu"
| "Matthew"
| "Maxim"
| "Mia"
| "Miguel"
| "Mizuki"
| "Naja"
| "Nicole"
| "Olivia"
| "Penelope"
| "Raveena"
| "Ricardo"
| "Ruben"
| "Russell"
| "Salli"
| "Seoyeon"
| "Takumi"
| "Tatyana"
| "Vicki"
| "Vitoria"
| "Zeina"
| "Zhiyu"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Voice {
  Gender?: Gender | null;
  Id?: VoiceId | null;
  LanguageCode?: LanguageCode | null;
  LanguageName?: string | null;
  Name?: string | null;
  AdditionalLanguageCodes?: LanguageCode[] | null;
  SupportedEngines?: Engine[] | null;
}

// refs: 1 - tags: output, named, enum
export type Gender =
| "Female"
| "Male"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Lexicon {
  Content?: string | null;
  Name?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface LexiconAttributes {
  Alphabet?: string | null;
  LanguageCode?: LanguageCode | null;
  LastModified?: Date | number | null;
  LexiconArn?: string | null;
  LexemesCount?: number | null;
  Size?: number | null;
}

// refs: 3 - tags: output, named, interface
export interface SynthesisTask {
  Engine?: Engine | null;
  TaskId?: string | null;
  TaskStatus?: TaskStatus | null;
  TaskStatusReason?: string | null;
  OutputUri?: string | null;
  CreationTime?: Date | number | null;
  RequestCharacters?: number | null;
  SnsTopicArn?: string | null;
  LexiconNames?: string[] | null;
  OutputFormat?: OutputFormat | null;
  SampleRate?: string | null;
  SpeechMarkTypes?: SpeechMarkType[] | null;
  TextType?: TextType | null;
  VoiceId?: VoiceId | null;
  LanguageCode?: LanguageCode | null;
}

// refs: 1 - tags: output, named, interface
export interface LexiconDescription {
  Name?: string | null;
  Attributes?: LexiconAttributes | null;
}
