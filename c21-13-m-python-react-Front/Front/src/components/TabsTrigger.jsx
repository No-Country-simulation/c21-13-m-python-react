import * as Tabs from '@radix-ui/react-tabs';


const TabsTrigger = ({ value, Icon, text, onClick}) => {
  return (
    <Tabs.Trigger value={value} 
    onClick={onClick}
    className="flex items-center gap-2 p-2 aria-selected:bg-white aria-selected:rounded-lg">
      <Icon className="w-[20px] md:w-[16px] mx-4 sm:mx-0"/>
      <span className="hidden md:inline md:text-sm">{text}</span>
    </Tabs.Trigger>
  )
}

export default TabsTrigger
