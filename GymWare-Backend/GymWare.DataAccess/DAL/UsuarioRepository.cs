using GymWare.Entities;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.DataAccess.DAL
{
    public class UsuarioRepository : BaseRepository
    {
        public Cliente CheckCliente(UsuarioLoginDTO usuarioLoginDTO)
        {
            return _db.Clientes.FirstOrDefault(x => x.NombreUsuario == usuarioLoginDTO.Usuario && x.Contrasenia == usuarioLoginDTO.Contrasenia);
        }

        public Empleado CheckEmpleado(UsuarioLoginDTO usuarioLoginDTO)
        {
            return _db.Empleados.FirstOrDefault(x => x.NombreUsuario == usuarioLoginDTO.Usuario && x.Contrasenia == usuarioLoginDTO.Contrasenia);
        }
    }
}
