"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  generatePassword,
  getPasswordStrength,
  getTimeToCrack,
  PasswordOptions,
} from "../utils/passwordUtils";
import { Copy } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    easyToSay: false,
    easyToRead: false,
    allCharacters: true,
  });

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    generateNewPassword();
  }, [options]);

  const generateNewPassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const handleOptionChange = (
    option: keyof PasswordOptions,
    value: boolean | number
  ) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [option]: value };
      if (option === "easyToSay" && value) {
        newOptions.easyToRead = false;
        newOptions.allCharacters = false;
        newOptions.numbers = false;
        newOptions.symbols = false;
      } else if (option === "easyToRead" && value) {
        newOptions.easyToSay = false;
        newOptions.allCharacters = false;
      } else if (option === "allCharacters" && value) {
        newOptions.easyToSay = false;
        newOptions.easyToRead = false;
      }
      return newOptions;
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Password Generator</CardTitle>
        <CardDescription>
          Generate a secure password or check your own
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Password</Label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setStrength(getPasswordStrength(e.target.value));
                  }}
                  className="w-full h-10 px-3 text-lg font-mono bg-secondary text-secondary-foreground border border-border rounded-l-md focus:outline-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-10 rounded-l-none border-l-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Password Strength</Label>
              <div className="h-2 bg-secondary rounded-full mt-2">
                <div
                  className={`h-full rounded-full ${
                    strength === 0
                      ? "bg-destructive"
                      : strength === 1
                      ? "bg-orange-500"
                      : strength === 2
                      ? "bg-yellow-500"
                      : strength === 3
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${(strength + 1) * 20}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Time to crack: {getTimeToCrack(password)}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Length: {options.length}
              </Label>
              <Slider
                value={[options.length]}
                onValueChange={([value]) => handleOptionChange("length", value)}
                max={50}
                min={8}
                step={1}
                className="my-4"
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Include:</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="uppercase" className="text-sm font-normal">
                    Uppercase
                  </Label>
                  <Switch
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) =>
                      handleOptionChange("uppercase", checked)
                    }
                    disabled={options.easyToSay}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="lowercase" className="text-sm font-normal">
                    Lowercase
                  </Label>
                  <Switch
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) =>
                      handleOptionChange("lowercase", checked)
                    }
                    disabled={options.easyToSay}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="numbers" className="text-sm font-normal">
                    Numbers
                  </Label>
                  <Switch
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) =>
                      handleOptionChange("numbers", checked)
                    }
                    disabled={options.easyToSay}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="symbols" className="text-sm font-normal">
                    Symbols
                  </Label>
                  <Switch
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) =>
                      handleOptionChange("symbols", checked)
                    }
                    disabled={options.easyToSay}
                  />
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <Label className="text-base font-semibold">Password Type</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={options.easyToSay ? "secondary" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleOptionChange("easyToSay", !options.easyToSay)
                  }
                >
                  Easy to say
                </Button>
                <Button
                  variant={options.easyToRead ? "secondary" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleOptionChange("easyToRead", !options.easyToRead)
                  }
                >
                  Easy to read
                </Button>
                <Button
                  variant={options.allCharacters ? "secondary" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleOptionChange("allCharacters", !options.allCharacters)
                  }
                >
                  All characters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Button onClick={generateNewPassword} className="w-full">
          Generate New Password
        </Button>
      </CardContent>
    </Card>
  );
}
