'use client'

import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { MdOutlineAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { appendFormData } from "@/lib/utils"
import { BASE_URL } from "@/lib/constants"


// Interface for formData
export interface EventFormData {
  title: string
  description: string
  overview: string
  eventBanner?: File | null
  venue: string
  location: string
  date: string
  time: string
  mode: string
  audience: string[]
  agenda: string[]
  organizer: string
  tags: string[]
}

const NewEventForm = () => {
  // routing
  const router = useRouter();
  // initialize the state of the form
  const [formData, setFormData] = useState<EventFormData>({
    title: 'Test',
    description: 'test description',
    overview: 'test overview',
    eventBanner: null,
    venue: 'test',
    location: 'test',
    date: '2025-12-08',
    time: '18:50',
    mode: 'hybrid',
    audience: ['one', 'two'],
    agenda: ['1', '2'],
    organizer: 'test',
    tags: ['qw', 'we'],
  })

  // other required states
  const [currentAudience, setCurrentAudience] = useState('')
  const [currentAgenda, setCurrentAgenda] = useState('')
  const [currentTags, setCurrentTags] = useState('')
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  // handle change for inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const target = e.target as HTMLInputElement

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.files ? target.files[0] : null
      }))
    }
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }))
    }
  }
  // handle change for select input
  const handleSelectChange = (newValue: string) => {
    setFormData((prev) => ({
      ...prev,
      mode: newValue
    }))
  }

  // handle add audience item
  const handleAddAudienceItem = () => {
    if (currentAudience.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        audience: [...new Set([...prev.audience, currentAudience.trim()])]
      }))
      setCurrentAudience('')
    }
  }
  // handle add agenda item
  const handleAddAgendaItem = () => {
    if (currentAgenda.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        agenda: [...new Set([...prev.agenda, currentAgenda.trim()])]
      }))
      setCurrentAgenda('')
    }
  }
  // handle add tag item
  const handleAddTagItem = () => {
    if (currentTags.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        tags: [...new Set([...prev.tags, currentTags.trim()])]
      }))
      setCurrentTags('')
    }
  }

  // handle remove audience item
  const handleRemoveAudienceItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      audience: prev.audience.filter((_, i) => i !== index)
    }))
  }
  // handle remove agenda item
  const handleRemoveAgendaItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }))
  }
  // handle remove audience item
  const handleRemoveTagsItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  // handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const fetchRequest = await fetch(`${BASE_URL}/api/events`, {
        method: 'POST',
        body: appendFormData(formData),
      })
      if (!fetchRequest.ok) {
        console.log('POST Fetch failed : ', fetchRequest.status)
      }
      const result = await fetchRequest.json()
      const { event } = result

      router.push(`${BASE_URL}/events/${event.slug}`)
    } catch (error) {
      console.error('Error creating event : ', error)
      throw new Error(`${error}`)
    }
  }

  return (
    <div className="p-5 max-w-[600px] mx-auto" >
      <h2 className="text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="text-[12px]">
        {/* TITLE : input-text */}
        <div className="mt-3">
          <Label htmlFor="title" className="mb-2 text-[18px] font-semibold">Title</Label>
          <Input type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* DESCRIPTION : textarea */}
        <div className="mt-3">
          <Label htmlFor="description" className="mb-2 text-[18px] font-semibold">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        {/* OVERVIEW : textarea */}
        <div className="mt-3">
          <Label htmlFor="overview" className="mb-2 text-[18px] font-semibold">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows={4}
          />
        </div>
        {/* EVENT BANNER : input-file */}
        <div className="mt-3">
          <Label htmlFor="eventBanner" className="mb-2 text-[18px] font-semibold">Event Banner</Label>
          <Input type="file"
            id="eventBanner"
            name="eventBanner"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        {/* VENUE : input-text */}
        <div className="mt-3">
          <Label htmlFor="venue" className="mb-2 text-[18px] font-semibold">Venue</Label>
          <Input type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
        {/* LOCATION : input-text */}
        <div className="mt-3">
          <Label htmlFor="location" className="mb-2 text-[18px] font-semibold">Location</Label>
          <Input type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        {/* DATE : shadcn calender with popover :TODO: required*/}
        <div className="mt-3">
          <Label htmlFor="date" className="mb-2 text-[18px] font-semibold">Event Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant={"outline"} id="date" className="w-32 justify-between font-normal">
                {date ? date.toLocaleDateString() : "Select Date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar mode="single"
                captionLayout="dropdown"
                startMonth={new Date(2000, 0)}
                endMonth={new Date(2050, 0)}
                selected={date}
                required={true}
                onSelect={(dt) => {
                  setDate(dt)
                  const newDate = dt.toISOString().split("T")[0]
                  setFormData((prev) => ({
                    ...prev,
                    date: newDate || ''
                  }))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* TIME : input-time */}
        <div className="mt-3">
          <Label htmlFor="time" className="mb-2 text-[18px] font-semibold">Event Time</Label>
          <Input type="time"
            id="time"
            name="time"
            className="p-2 text-[16px] [&::-webkit-calendar-picker-indicator]:invert"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        {/* MODE : schadcn select :TODO: required*/}
        <div className="mt-3">
          <Label htmlFor="mode" className="mb-2 text-[18px] font-semibold">Mode</Label>
          <Select name="mode"
            value={formData.mode}
            onValueChange={handleSelectChange}
            required={true} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder='Select Mode' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mode</SelectLabel>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* AUDIENCE : fieldset */}
        <div className="mt-3">
          <fieldset>
            <legend className="mb-2 text-[18px] font-semibold">Audience</legend>
            <div className="flex gap-3">
              <Input type="text"
                placeholder="Enter new audience"
                value={currentAudience}
                onChange={(e) => setCurrentAudience(e.target.value)}
              />
              <Button type="button"
                className="w-[130px]"
                onClick={handleAddAudienceItem}
                disabled={currentAudience.trim() === ''}>
                <MdOutlineAddCircleOutline className="text-[green]" />
                Add Audience
              </Button>
            </div>
            {/* list of currently added audience */}
            <div className="flex mt-2 gap-3">
              {formData.audience.length > 0
                ? (formData.audience.map((audience, index) => (
                  <div key={index} className="flex items-center gap-2 bg-dark-100 rounded-[6px] p-2 text-sm">
                    {audience}
                    <MdOutlineRemoveCircleOutline
                      className="text-[red]"
                      onClick={() => handleRemoveAudienceItem(index)}
                    />
                  </div>
                )))
                : (<p className="text-[#888] py-2">No audience added yet.</p>)
              }
            </div>
          </fieldset>
        </div>
        {/* AGENDA : fieldset */}
        <div className="mt-3">
          <fieldset>
            <legend className="mb-2 text-[18px] font-semibold">Agenda</legend>
            <div className="flex gap-3">
              <Input type="text"
                placeholder="Enter new agenda"
                value={currentAgenda}
                onChange={(e) => setCurrentAgenda(e.target.value)}
              />
              <Button type="button"
                className="w-[130px]"
                onClick={handleAddAgendaItem}
                disabled={currentAgenda.trim() === ''}>
                <MdOutlineAddCircleOutline className="text-[green]" />
                Add Agenda
              </Button>
            </div>
            {/* list of currently added agenda */}
            <div className="flex flex-col mt-2 gap-3">
              {formData.agenda.length > 0
                ? (formData.agenda.map((agen, index) => (
                  <div key={index} className="flex items-center gap-2 bg-dark-100 rounded-[6px] p-2 text-sm justify-between">
                    {agen}
                    <MdOutlineRemoveCircleOutline
                      className="text-[red]"
                      onClick={() => handleRemoveAgendaItem(index)}
                    />
                  </div>
                )))
                : (<p className="text-[#888] py-2">No agenda added yet.</p>)
              }
            </div>
          </fieldset>
        </div>
        {/* ORGANIZER : textarea */}
        <div className="mt-3">
          <Label htmlFor="organizer" className="mb-2 text-[18px] font-semibold">Organizer</Label>
          <Textarea
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            rows={4}
          />
        </div>
        {/* TAGS : fieldset */}
        <div className="mt-3">
          <fieldset>
            <legend className="mb-2 text-[18px] font-semibold">Tags</legend>
            <div className="flex gap-3">
              <Input type="text"
                placeholder="Enter new tag"
                value={currentTags}
                onChange={(e) => setCurrentTags(e.target.value)}
              />
              <Button type="button"
                className="w-[130px]"
                onClick={handleAddTagItem}
                disabled={currentTags.trim() === ''}>
                <MdOutlineAddCircleOutline className="text-[green]" />
                Add Tag
              </Button>
            </div>
            {/* list of currently added tags */}
            <div className="flex mt-2 gap-3">
              {formData.tags.length > 0
                ? (formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 bg-dark-100 rounded-[6px] p-2 text-sm">
                    {tag}
                    <MdOutlineRemoveCircleOutline
                      className="text-[red]/60"
                      onClick={() => handleRemoveTagsItem(index)}
                    />
                  </div>
                )))
                : (<p className="text-[#888] py-2">No tags added yet.</p>)
              }
            </div>
          </fieldset>
        </div>
        <Button type="submit" className="w-full mt-3 h-12 cursor-pointer">Create</Button>
      </form >
    </div >
  )
}

export default NewEventForm