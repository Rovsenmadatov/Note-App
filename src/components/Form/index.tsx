import { FormEvent, useRef, useState } from "react"
import {Button, Col, Form, Row, Stack} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ReactSelect from "react-select/creatable"
import { v4 } from "uuid"
import { Tag } from "../../types"
import { CreateProps } from "../../pages/Create"

const CustomForm = ({handleSubmit,availableTags,createTag,markdown="",title="",tags=[]}:CreateProps) => {
  const [selectedTags,setSelectedTags]= useState<Tag[]>(tags)
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);


  const handleSend = (e:FormEvent)=>{
    e.preventDefault();

    handleSubmit({
      title:titleRef.current?.value as string,
      markdown:markdownRef.current?.value as string,
      tags:selectedTags,
    });

    navigate("/")
  }

 

  return (
    <Form onSubmit={handleSend} className="mt-4">
     <Stack>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control defaultValue={title}  ref={titleRef} className="shadow" required></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
            onChange={(all_tags)=>setSelectedTags(all_tags as Tag[])}
            onCreateOption={(text)=>{
              const newTag:Tag = {label:text,value:v4()}

              createTag(newTag);
              
              setSelectedTags([...selectedTags,newTag])
            }} 

           value={selectedTags} 
           options={availableTags}
            isMulti className="text-black shadow"></ReactSelect>
          </Form.Group>
        </Col>
      </Row>



      <Form.Group className="mt-4">
        <Form.Label>içerik markdown destekler</Form.Label>
        <Form.Control defaultValue={markdown} ref={markdownRef} as="textarea" className="shadow" style={{
          minHeight:"300px",
          maxHeight:"500px",
        }} />
      </Form.Group>


      <Stack direction="horizontal" className="justify-content-end mt-5" gap={4}  >
        <Button type="submit" >Kaydet</Button>
        <Button onClick={() => navigate(-1)} type="button" variant="secondary" >Geri</Button>
      </Stack>
     </Stack>
    </Form>
  )
}

export default CustomForm