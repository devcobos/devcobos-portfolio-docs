import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText } from "lucide-react";

interface DownloadDropdownProps {
  markdownContent: string;
  title: string;
}

export default function DownloadDropdown({
  markdownContent,
  title,
}: DownloadDropdownProps) {
  const downloadMarkdown = () => {
    const blob = new Blob([markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    console.log("Dowloading PDF...");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Download className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Descargar documento</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={downloadMarkdown} className="cursor-pointer">
          <FileText className="mr-1 h-4 w-4" />
          <span>Markdown</span>
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={downloadPDF} className="cursor-pointer">
          <FileDown className="mr-1 h-4 w-4" />
          <span>PDF</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
