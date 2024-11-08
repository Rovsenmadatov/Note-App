import CustomForm from "../../components/Form"
import { NoteData, Tag } from "../../types"

export type CreateProps = {
  handleSubmit:(noteData:NoteData)=>void;
  createTag:(tag:Tag)=>void;
  availableTags:Tag[];
} & Partial<NoteData>


const Create = ({availableTags,handleSubmit,createTag}:CreateProps) => {
  return (
    <div className="container py-5">
      <h2>Yeni Not Oluştur</h2>

      <CustomForm handleSubmit={handleSubmit} createTag={createTag} availableTags={availableTags}   />
    </div>
  )
}

export default Create
