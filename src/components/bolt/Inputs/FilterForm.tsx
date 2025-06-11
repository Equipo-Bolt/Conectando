"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Filter } from "@/types/Filter";
import type { BusinessUnit } from "@/types/BusinessUnit";
import type { Role } from "@/types/Role";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";

interface FilterFormProps {
  roles: Role[];
  businessUnits: BusinessUnit[];
  initialFilters: Filter;
  onSubmit: (filters: Filter) => void;
}

export function FilterForm({
  roles,
  businessUnits,
  initialFilters,
  onSubmit,
}: FilterFormProps) {
  const { register, watch, setValue } = useForm<Filter>({
    defaultValues: {
      ...initialFilters,
      roleID: initialFilters.roleID || "all",
      businessUnitID: initialFilters.businessUnitID || "all"
    },
  });


  const debouncedSubmit = debounce((filters: Filter) => {
    const cleanedFilters: Filter = {
      ...(filters.name && { name: filters.name }),
      ...(filters.roleID && filters.roleID !== "all" && { roleID: filters.roleID }),
      ...(filters.businessUnitID && filters.businessUnitID !== "all" && { businessUnitID: filters.businessUnitID })
    };
    onSubmit(cleanedFilters);
  }, 300);

  useEffect(() => {
    const subscription = watch((value) => {
      debouncedSubmit(value as Filter);
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedSubmit]);

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <Input
          {...register("name")}
          placeholder="Buscar por nombre"
          onChange={(e) => setValue("name", e.target.value)}
        />
      </div>

      <div className="min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Rol</label>
        <Select
          onValueChange={(value) => setValue("roleID", value)}
          value={watch("roleID")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos los roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id.toString()}>
                {role.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Unidad de Negocio</label>
        <Select
          onValueChange={(value) => setValue("businessUnitID", value)}
          value={watch("businessUnitID")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas las unidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las unidades</SelectItem>
            {businessUnits.map((unit) => (
              <SelectItem key={unit.id} value={unit.id.toString()}>
                {unit.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}